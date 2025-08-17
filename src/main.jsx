import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout.jsx';
import Error from './pages/Error.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import Orders from './pages/Orders.jsx';
import Settings from './pages/Settings.jsx';
import Customers from './pages/Customers.jsx';
import LoginPage from './pages/Login.jsx';

import AuthCallback from './features/auth/AuthCallback.jsx';
import ProtectedRoute from './features/auth/ProtectedRoute.jsx';
import { AuthProvider } from './features/auth/AuthContext.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';

import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        errorElement: <Error />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'products', element: <Products /> },
            { path: 'orders', element: <Orders /> },
            { path: 'customers', element: <Customers /> },
            { path: 'settings', element: <Settings /> },
        ],
    },
    {
        path: '/auth/callback',
        element: <AuthCallback />,
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Toaster richColors position='top-center' duration={2000} />
                <ReactQueryDevtools initialIsOpen={false} />
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);
