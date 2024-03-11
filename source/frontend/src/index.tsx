import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'atomic-router-react';
import { router, appStated } from './context/router';

import './style/index.css';
import App from './pages/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
appStated();
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
