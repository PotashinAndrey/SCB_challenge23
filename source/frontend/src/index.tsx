import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'atomic-router-react';
import { router, appStated } from '@context/router';

import './style/index.css';
import Application from './pages/Application';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
appStated();

root.render(
  <RouterProvider router={router}>
    <Application />
  </RouterProvider>
);
