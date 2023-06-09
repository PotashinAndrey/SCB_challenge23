import type { FC } from "react";
import { useState } from "react";
import { Input, Button, Select, Space } from 'antd';
const { Search } = Input;

import Paper from "../ui/Paper";

// interface DashboardFilterProps {
//   : ;
//   test?: string;
// }

/** DashboardFilter -  */
const DashboardFilter: FC = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e: any) => {
    setSearch((e.target.value))
  }

  const handleAdd = () => {
    // setOpen(true);
  }

  const handleCreate = () => {

  }

  return (
    <Paper className="flex dashboard-header">
      <Space>
        <Button onClick={handleAdd} type="primary">Добавить</Button>
        <Search
          className="board-component-search"
          placeholder="Поиск..."
          onInput={handleSearch}
          style={{ width: 200 }}
        />
        <Filters />
      </Space>
    </Paper>
  );
};

export default DashboardFilter;

const Filters: FC = () => {

  const departmentOptions = [
    { value: '', label: 'Департамент' },
    { value: 'development', label: 'Разработка' },
    { value: 'support', label: 'Поддержка' },
    { value: 'managment', label: 'Менеджмент' }
  ];

  const vacanciesOptions = [
    { value: '', label: 'Вакансия' },
    { value: 'junior', label: 'Джун' },
    { value: 'middle', label: 'Мидл' },
    { value: 'senior', label: 'Помидор' }
  ];

  return (
    <Space>
      <Select
        defaultValue=""
        style={{ width: 140 }}
        onChange={() => { }}
        options={departmentOptions}
      />
      <Select
        defaultValue=""
        style={{ width: 120 }}
        onChange={() => { }}
        options={vacanciesOptions}
      />
    </Space>
  );
}
