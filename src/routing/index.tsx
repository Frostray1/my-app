import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../components/AppLayout';

const Dashboard = lazy(() => import('../components/Dashboard'));
const Settings = lazy(() => import('../components/Settings'));

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [

      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Suspense fallback="loading...">
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Suspense fallback="loading...">
              <Settings />
            </Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <div>Profile Page</div>
          </ProtectedRoute>
        )
      }
    ]
  }
]);
