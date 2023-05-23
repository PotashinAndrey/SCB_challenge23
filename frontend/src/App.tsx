import React, { FC } from 'react';

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import './App.css';
import { Layout } from 'antd';
import Login from './pages/Login/Login';
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
            </>
          )} />
          <Route path="/login" element={<Login />} />
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
