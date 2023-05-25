import React, { useState } from "react";

import "../style/ColumnItem.css";
import { createRoutesView, Link } from "atomic-router-react";
import { routing } from "src/context/router";
import Login from "src/pages/Login";
import Registration from "src/pages/Registration";
import Dashboard from "src/pages/Dashboard";
import CandidateCreate from "src/pages/CandidateCreate";
import "../style/Menu.css";
import { Menu, MenuProps } from "antd";
import { CaretDownFilled } from '@ant-design/icons'
import '../../../../node_modules/antd/dist/reset.css'
import SmileOutlined from '@ant-design/icons/SmileOutlined';
import CalendarItem from "./Calendar";

  const leftItems: MenuProps['items'] = [
    {
      label: (
        <a>
          <Link to={routing.login}>Login</Link>
        </a>
      ),
      key: 'login',
    },
    {
        label: (
          <a>
            <Link to={routing.registration}>Registration</Link>
          </a>
        ),
        key: 'register',
        
    },
    {
        label: (
          <a>
            <Link to={routing.dashboard}>Dashboard</Link>
          </a>
        ),
        key: 'dashboard',
        icon: <SmileOutlined/>
    },
    {
        label: (
          <a>
            <Link to={routing.candidateCreate}>Create Candidate</Link>
          </a>
        ),
        key: 'create',
    }
  ];

  const rightItems: MenuProps['items'] = [
    {
        label: 'Vladlena Na ',
        key: 'logout',
        style: {float: 'right'},
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
const Menu1 = createRoutesView({
    routes: [
      { route: routing.login,           view: Login },
      { route: routing.registration,    view: Registration },
      { route: routing.dashboard,       view: Dashboard },
      { route: routing.candidateCreate, view: CandidateCreate },
      // { route: Post.route, view: PostPage.view },
    ],
    otherwise() {
      return (
        <div className="menu">
            <CaretDownFilled style={{color: 'purple'}}/>
            <Menu style={{width: '90%'}} mode="horizontal" items={leftItems}/>
            <Menu style={{width: '10%'}} mode="horizontal" items={rightItems}/>
            <CalendarItem/>
        </div>
      );
    },
});
export default Menu1;
