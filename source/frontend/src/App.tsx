import React, { FC } from 'react';

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { Layout } from 'antd';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { CandidateInfo } from './components/CandidateInfo';
const { Header, Content, Footer } = Layout;

import './App.css';
import CandidateCreate from './pages/CandidateCreate/CandidateCreate';

const candidate = {
  name: "Андрей Поташин",
  role: "middle frontend developer",
  description: {
      birthDate: "29.04.2000",
      sex: "Муж.",
      text: "Работать умею - работать люблю, бизнес ставит задачу - я её делаю."
  },
  salary: 300000,
  contacts: {
      email: "test@test.test",
      phone: "+55555555555",
      telegram: "@potaqqshinAndrey",
      vk: "vk.com",
  },
  notes: "Хороший чел, позитивный, надо брать!"
}

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
              <p><Link to={"/candidate"}>Candidate</Link></p>
              <p><Link to={"/create-candidate"}>Create Candidate</Link></p>
            </>
          )} />
          <Route path="/login" element={<Login />} />
          <Route path="/candidate" element={<CandidateInfo {...candidate} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-candidate" element={<CandidateCreate />} />
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
