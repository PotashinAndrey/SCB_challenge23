import type { FC } from "react";
import { useState } from "react";
import { useUnit } from "effector-react";
import { Timeline, Descriptions, Dropdown, Button, Space } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import CalendarComponent from "../components/CalendarComponent";
import Paper from "../ui/Paper";
import type { CalendarEventModel } from "@app/types/model/calendar";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { applicantProcessPopup, calendarListData, calendarPageOpen, interviewPopup } from "../context/model/applicant";

interface iCalendarData {
  id: number,
  content: string,
  date: number
}

const items = [ //  MenuProps['items']
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

  const getTimeByDate = (dateTs: number) => {
    const date = new Date(dateTs * 1000);
    const minutes = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
    return date.getHours() + ":" + minutes;
  }

/** CalendarPage -  */
const CalendarPage: FC = () => {
  const menuProps = {
    items,
    onClick: () => { },
  };

  const { store, loading } = useUnit(calendarListData);
  const getItemsByDate = (day: Dayjs) => {
    const dayString = day.format('DD/MM/YYYY');

    return store.items.filter((item) => {
      const timestamp = new Date(item.timestamp).getTime();
      const date = new Date(timestamp);
      const dateMonth = date.getMonth() + 1;
      const dateMonthZero = dateMonth < 10 ? '0' + dateMonth.toString() : dateMonth.toString();
      const dateString = date.getDate().toString() + '/' + dateMonthZero + '/' + date.getFullYear().toString()
      return dateString === dayString
    })
  }

  const [todayList, setTodayList] = useState<CalendarEventModel[]>(getItemsByDate(dayjs()));

  return (
    <Paper className="flex center gap mt-8 padding">
      <CalendarComponent setTodayList={setTodayList} />

      <div className="margin w-aside padding">
        <Timeline
          items={
            (todayList || []).map((item) => {
              return {
                children:
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Время">
                      {getTimeByDate(new Date(item.timestamp).getTime())}
                    </Descriptions.Item>
                    <Descriptions.Item label="Кандидат">{item.name}</Descriptions.Item>
                  </Descriptions>
              }
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
  );
};

export default CalendarPage;
