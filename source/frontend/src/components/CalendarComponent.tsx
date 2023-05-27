import React, { FC, useState } from "react";
import { Badge, Calendar, Timeline, Descriptions } from 'antd';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import Paper from "src/ui/Paper";

import "../style/ColumnItem.css";

interface iCalendarData {
  id: number,
  content: string,
  date: number
}

const data:iCalendarData[] = [
    {
        id: 0,
        content: "Иванов Иван",
        date: 1685037923,
    },
    {
      id: 1,
      content: "Помидоркин Константин",
      date: 1685037820,
    },
    {
        id: 2,
        content: "Матвеева Анна",
        date: 1684778723,
    },
    {
      id: 3,
      content: "Киров Андрей",
      date: 1685214350,
  }
];

const getItemsByDate = (day: Dayjs) => {
  const dayString = day.format('DD/MM/YYYY');

  return data.filter((item)=> {
    const timestamp = item.date;
    const date = new Date(timestamp * 1000);
    const dateMonth = date.getMonth()+1;
    const dateMonthZero =  dateMonth < 10 ? '0' + dateMonth.toString() : dateMonth.toString();
    const dateString = date.getDate().toString() + '/' + dateMonthZero + '/' + date.getFullYear().toString()
    return dateString === dayString
  })
}

const getItemsByMonth = (day: Dayjs) => {
  const dayString = day.get('M');

  return data.filter((item)=> {
    const timestamp = item.date;
    const date = new Date(timestamp * 1000);
    const dateMonth = date.getMonth()+1;
    return dayString === dateMonth
  })
}


const CalendarItem: FC = () => {
    const [value, setValue] = useState(() => dayjs('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
    const [todayList, setTodayList] = useState<iCalendarData[]>(getItemsByDate(dayjs()));
    

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
        setTodayList(getItemsByDate(newValue));
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getItemsByDate(value)

        return (
          <ul className="events">
            {listData.map((item) => (
              <li key={item.content}>
                <Badge status={"success"} text={item.content} />
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
          {listData.map((item) => (
            <li key={item.content}>
              <Badge status={"success"} text={item.content} />
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
      
    return (
      <Paper className="flex">
          <Calendar style={{width: '860px'}} onSelect={onSelect} cellRender={cellRender} onPanelChange={onPanelChange}/>
          <Timeline
            style={{width: '250px'}}
            items={
              todayList?.map((item) => {
                return { children:
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Время">
                      {getTimeByDate(item.date)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Кандидат">{item.content}</Descriptions.Item>
                  </Descriptions>}
              })
          }
          />
      </Paper>
    )
}

export default CalendarItem;
