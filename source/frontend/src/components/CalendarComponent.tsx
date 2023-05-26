import React, { FC, useState } from "react";

import type { CellRenderInfo } from 'rc-picker/lib/interface';
import type { Dayjs } from 'dayjs';
import { Badge, Calendar, BadgeProps } from 'antd';
import dayjs from 'dayjs';

import "../style/ColumnItem.css";

interface CalendarProps {
}

const data = [
    {
        "id": 0,
        "content": "Иванов Иван",
        "date": 1685037923,
    },
    {
        "id": 1,
        "content": "Матвеева Анна",
        "date": 1684778723,
    }
];


const CalendarItem: FC<CalendarProps> = props => {
    const [value, setValue] = useState(() => dayjs('2017-01-25'));
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
    
    // const dateCellRender = (value: Dayjs) => {
    //     calendarData.filter((item) => 
    //         ((new Date(item.date * 1000)).getDay() === value.get('date'))
    //     )
    //     console.log(calendarData, value.get('date'), value.get('month'))
    //     return (
    //         <ul className="events">
    //         {calendarData.map((item) => (
    //             <li key={item.name+item.surname}>
    //             <Badge status={item.type as BadgeProps['status']} text={item.name} />
    //             </li>
    //         ))}
    //         </ul>
    //     );
    // };
    
    // const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    //     if (info.type === 'date') return dateCellRender(current);
    //     return info.originNode;
    // };

    const onSelect = (newValue: Dayjs) => {
        setValue(newValue);
        setSelectedValue(newValue);
        alert(newValue)
    };

    const onPanelChange = (newValue: Dayjs) => {
        setValue(newValue);
    };

    const cellRender = (value: Dayjs) => {
        const stringValue = value.format('DD/MM/YYYY');
        
        const listData = data.filter((item)=> {
            const timestamp = item.date;
            const date = new Date(timestamp * 1000);
            const dateMonth = date.getMonth()+1;
            const dateMonthZero =  dateMonth < 10 ? '0' + dateMonth.toString() : dateMonth.toString();
            const dateString = date.getDate().toString() + '/' + dateMonthZero + '/' + date.getFullYear().toString()
            return dateString === stringValue
        })

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
    
      
      return (
          <>
            <Calendar onSelect={onSelect} cellRender={cellRender} onPanelChange={onPanelChange}/>;
        </>
    );
}

export default CalendarItem;
