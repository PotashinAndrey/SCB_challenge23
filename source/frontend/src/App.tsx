import React, { FC } from 'react';

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { Layout } from 'antd';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
const { Header, Content, Footer } = Layout;

import './App.css';


const App: FC = () => {
  const navigate = useNavigate();
  return (
    <Layout className="layout">
      <div className="App">
        <Routes>
          <Route path="*" element={(
            <>
              <p><Link to={"/login"}>Login</Link></p>
              <p><Link to={"/dashboard"}>Dashboard</Link></p>
            </>
          )} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {/* <div style={{ color: "red", fontSize: "32px" }}>
          прямые УРЛЫ страниц содержат символ решеточки (нужно для HashRouter)
          <br />
          Пример: <b>http://localhost:8080/#/login</b>
        </div> */}
      </div>
    </Layout>
  );
}

export default App;
