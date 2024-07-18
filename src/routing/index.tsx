import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../components/AppLayout';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Settings = lazy(() => import('../components/Settings'));
const Orders = lazy(() => import('../pages/Orders'));

// Mock функции для проверки авторизации
const isAuthenticated = () => {
  // Реализуйте вашу логику авторизации здесь
  return true; // или false в зависимости от авторизации пользователя
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: isAuthenticated() ? (
      <Navigate to="/clients" />
    ) : (
      <Navigate to="/login" />
    ),
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
        path: '/clients',
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
        path: '/orders',
        element: (
          <ProtectedRoute>
            <Suspense fallback="loading...">
              <Orders />
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
