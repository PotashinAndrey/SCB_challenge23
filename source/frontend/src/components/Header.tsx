import type { FC } from "react";
import { Menu, MenuProps } from "antd";
import { Link } from "atomic-router-react";
import { routing } from "../context/router";
// import "../style/ColumnItem.css";
// import "../style/Menu.css";
// import CaretDownFilled from '@ant-design/icons/CaretDownFilled'
// import '../../../../node_modules/antd/dist/reset.css'
// import SmileOutlined from '@ant-design/icons/SmileOutlined';
// import CalendarItem from "./Calendar";

const leftItems: MenuProps['items'] = [{
    label: <Link to={routing.login}>Login</Link>,
    key: 'login'
  }, {
    label: <Link to={routing.registration}>Registration</Link>,
    key: 'register'
  }, {
    label: <Link to={routing.dashboard}>Dashboard</Link>,
    key: 'dashboard',
    // icon: <SmileOutlined />
  }, {
    label: <Link to={routing.candidateCreate}>Create Candidate</Link>,
    key: 'create',
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

const Header: FC = () => {
  return (
    <div className="box flex space-between">
      {/* <CaretDownFilled style={{ color: 'purple' }} /> */}
      <Menu mode="horizontal" items={leftItems} /> {/* style={{ width: '90%' }} */}
      <Menu mode="horizontal" items={rightItems} /> {/* style={{ width: '10%' }} сделать button + dropdown */}
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
