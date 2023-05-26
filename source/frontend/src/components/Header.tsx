import type { FC } from "react";
import { Menu, MenuProps, Dropdown, message, Avatar, Space, Typography, Input } from "antd";
import { UserOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from "atomic-router-react";
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
    key: "applicants",
    label: "Кандидаты",
    children: [{
      label: <Link to={routing.candidateCreate}>Добавить кандидата</Link>,
      key: 'applicants-create',
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
    }]
  }];

const rightItems: MenuProps['items'] = [
  {
    label: 'Vladlena Na',
    key: 'logout',
    // style: { float: 'right' },
    children: [
      {
        type: 'group',
        label: '',
        children: [
          {
            label: 'Выйти из системы',
            key: 'logout-submenu',
          }
        ],
      }
    ],
  },
];

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items: MenuProps['items'] = [
  {
    label: 'Профиль',
    key: '1',
  },
  {
    label: 'Параметры',
    key: '2',
  },
  {
    label: 'Выход из системы',
    key: '3',
  }
];

const Header: FC = () => {
  return (
    <div className="flex items-center space-between padding margin">
      <div className="flex items-center">
        <Menu mode="horizontal" items={leftItems} disabledOverflow /> {/* selectedKeys={["dashboard"]} */}
        <Search placeholder="Поиск..." onSearch={onSearch} className="w-card" />
      </div>

      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Text>Имя Фамилия</Text>
            <Avatar icon={<UserOutlined />} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

// const Menu1 = createRoutesView({
//   routes: [
//     { route: routing.login, view: Login },
//     { route: routing.registration, view: Registration },
//     { route: routing.dashboard, view: Dashboard },
//     { route: routing.candidateCreate, view: CandidateCreate },
//     // { route: Post.route, view: PostPage.view },
//   ],
//   otherwise() {
//     return (
//       <div className="menu">
//         <CaretDownFilled style={{ color: 'purple' }} />
//         <Menu style={{ width: '90%' }} mode="horizontal" items={leftItems} />
//         <Menu style={{ width: '10%' }} mode="horizontal" items={rightItems} />
//         {/* <CalendarItem /> */}
//       </div>
//     );
//   },
// });
export default Header;
