import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'atomic-router-react';
import { router } from './context/router';

import App from './App';
import './index.css';
// import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
