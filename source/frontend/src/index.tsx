import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'atomic-router-react';
import { router } from './context/router';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
