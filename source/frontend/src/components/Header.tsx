import type { FC } from "react";
import { useUnit } from "effector-react";
import { Menu, MenuProps, Dropdown, message, Avatar, Space, Typography, Input } from "antd";
import { UserOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from "atomic-router-react";

import { $user } from "../context/login";
import { routing } from "../context/router";
// import "../style/ColumnItem.css";
// import "../style/Menu.css";
// import CaretDownFilled from '@ant-design/icons/CaretDownFilled'
// import '../../../../node_modules/antd/dist/reset.css'
// import SmileOutlined from '@ant-design/icons/SmileOutlined';
// import CalendarItem from "./Calendar";

const { Text } = Typography;
const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const leftItems: MenuProps['items'] = [{
    key: "candidates",
    label: "Кандидаты",
    children: [{
      label: <Link to={routing.candidateCreate}>Добавить кандидата</Link>,
      key: 'candidates-create',
    },{
      label: <Link to={routing.candidateList}>Список кандидатов</Link>,
      key: 'candidates-list',
    }]
  }, {
    label: <Link to={routing.dashboard}>Процессы</Link>,
    key: 'dashboard',
    // icon: <SmileOutlined />
  }, {
    key: "company",
    label: "Компания",
    children: [{
        key: "vacancies",
        label: <Link to={routing.vacancies}>Вакансии</Link>
      }, {
        key: "departments",
        label: <Link to={routing.departments}>Отделы</Link>
      }
    ]
  }, {
    label: <Link to={routing.calendar}>Календарь событий</Link>,
    key: "calendar"
  }, {
    label: (<Space><Text>Дополнительно</Text><DownOutlined /></Space>),
    key: 'more',
    // icon: <DownOutlined />, // <SettingOutlined />,
    children: [{
        label: <Link to={routing.login}>Страница логина</Link>,
        key: 'login',
      }, {
        label: <Link to={routing.registration}>Страница регистрации</Link>,
        key: 'register',
      }, {
        label: <Link to={routing.processCreate}>Создание процесса</Link>,
        key: 'process-create'
    }, {
      label: <Link to={routing.processesList}>Список процессов</Link>,
      key: 'processes'
    }]
  }];

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items: MenuProps['items'] = [{
    label: 'Профиль',
    key: '1',
  }, {
    label: 'Параметры',
    key: '2',
  }, {
    label: 'Выход из системы',
    key: '3',
}];

const Header: FC = () => {
  const user = useUnit($user);

  return (
    <div className="flex items-center space-between padding margin">
      <div className="flex items-center">
        <Menu mode="horizontal" items={leftItems} disabledOverflow /> {/* selectedKeys={["dashboard"]} */}
        <Search placeholder="Поиск..." onSearch={onSearch} className="w-card" />
      </div>

      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Text>{user.name}</Text>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default Header;
