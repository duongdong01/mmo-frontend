import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/auth/index';
import Home from '../pages/home/index';
import Profile from '../pages/profile/index';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/profile/:userId',
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: '/admin',
    element: <div style={{ color: 'red' }}>Hello world!</div>,
  },
]);
