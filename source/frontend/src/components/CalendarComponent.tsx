import React, { FC, useEffect, useState } from "react";
import { Badge, Calendar, Timeline, Descriptions } from 'antd';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';


import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

import Paper from "src/ui/Paper";

import "../style/ColumnItem.css";
import { applicantProcessPopup, calendarListData, calendarPageOpen, interviewPopup } from "src/context/model/applicant";
import { useUnit } from "effector-react";
import { CalendarEventModel } from "@app/types/model/calendar";

interface iCalendarData {
  id: number,
  content: string,
  date: number
}

const items: MenuProps['items'] = [
  {
    label: 'Назначить собеседование',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Связаться с кандидатом',
    key: '2',
    icon: <UserOutlined />,
  }
];



const CalendarItem: FC = () => {
    const { store, loading } = useUnit(calendarListData);
    const [value, setValue] = useState(() => dayjs('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
    
    useEffect(calendarPageOpen, []);

    const getItemsByDate = (day: Dayjs) => {
      const dayString = day.format('DD/MM/YYYY');
    
      return store.items.filter((item)=> {
        const timestamp = item.timestamp;
        const date = new Date(timestamp * 1000);
        const dateMonth = date.getMonth()+1;
        const dateMonthZero =  dateMonth < 10 ? '0' + dateMonth.toString() : dateMonth.toString();
        const dateString = date.getDate().toString() + '/' + dateMonthZero + '/' + date.getFullYear().toString()
        return dateString === dayString
      })
    }

    const [todayList, setTodayList] = useState<CalendarEventModel[]>(getItemsByDate(dayjs()));
    
    const getItemsByMonth = (day: Dayjs) => {
      const dayString = day.get('M');
    
      return store.items.filter((item)=> {
        const timestamp = item.timestamp;
        const date = new Date(timestamp * 1000);
        const dateMonth = date.getMonth()+1;
        return dayString === dateMonth
      })
    }
    
    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
        setTodayList(getItemsByDate(newValue));
        interviewPopup.open(newValue);
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getItemsByDate(value)

        return (
          <ul className="events">
            {listData.map((item) => (
              <li key={item.name}>
                <Badge status={"success"} text={item.name + item.timestamp} />
              </li>
            ))}
          </ul>
        );
    };

    const getTimeByDate = (dateTs: number) => {
      const date = new Date(dateTs * 1000);
      const minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
      return date.getHours() + ":" + minutes;
    }

    const monthCellRender = (value: Dayjs) => {
      const listData = getItemsByMonth(value)

      return (
        <ul className="events">
          {store.items.map((item) => (
            <li key={item.name}>
              <Badge status={"success"} text={item.name} />
            </li>
          ))}
        </ul>
      );
    };

    const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
      if (info.type === 'date') return dateCellRender(current);
      if (info.type === 'month') return monthCellRender(current);
      return info.originNode;
    };

    const menuProps = {
      items,
      onClick: () => {},
    };
      
    return (
      <Paper className="flex">
          <Calendar style={{width: '860px'}} onSelect={onSelect} cellRender={cellRender} onPanelChange={onPanelChange}/>
          <div className="margin">
            <Timeline
              style={{width: '250px'}}
              items={
                todayList?.map((item) => {
                  return { children:
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="Время">
                        {getTimeByDate(item.timestamp)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Кандидат">{item.name}</Descriptions.Item>
                    </Descriptions>}
                })
            }
            />
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  Добавить событие
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
      </Paper>
    )
}

export default CalendarItem;
