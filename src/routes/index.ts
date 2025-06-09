import config from '@/config';
import { lazy } from 'react';

export const routes = [
    { path: config.routes.home, component: lazy(() => import('@/pages/Home/HomePage')) },
    { path: config.routes.products, component: lazy(() => import('@/pages/Products/ProductsPage')) },
    { path: config.routes.order, component: lazy(() => import('@/pages/Order/OrderPage')) },
    {
        path: config.routes.login,
        component: lazy(() => import('@/pages/Login/LoginPage')),
        layout: lazy(() => import('@/pages/Login/LoginPage')),
    },
    {
        path: config.routes.register,
        component: lazy(() => import('@/pages/Register/RegisterPage')),
        layout: lazy(() => import('@/pages/Register/RegisterPage')),
    },
    { path: config.routes.details, component: lazy(() => import('@/pages/Details/DetailsPage')) },
    { path: config.routes.profile, component: lazy(() => import('@/pages/Profile/ProfilePage')) },
    {
        path: config.routes.notfound,
        component: lazy(() => import('@/pages/NotFound/ProductsPage')),
        layout: lazy(() => import('@/pages/NotFound/ProductsPage')),
    },
    {
        path: config.routes.admin,
        component: lazy(() => import('@/pages/Admin/AdminPage')),
        layout: lazy(() => import('@/pages/Admin/AdminPage')),
        isPrivate: true,
    },
];
