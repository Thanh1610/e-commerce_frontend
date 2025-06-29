import config from '@/config';
import { lazy } from 'react';

export const routes = [
    { path: config.routes.home, component: lazy(() => import('@/pages/Home/HomePage')) },
    { path: config.routes.products, component: lazy(() => import('@/pages/Products/ProductsPage')) },
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
        component: lazy(() => import('@/pages/NotFound/NotFoundPage')),
        layout: lazy(() => import('@/pages/NotFound/NotFoundPage')),
    },
    { path: config.routes.type, component: lazy(() => import('@/pages/Type/TypePage')) },
    { path: config.routes.cart, component: lazy(() => import('@/pages/Cart/CartPage')) },
    { path: config.routes.orders, component: lazy(() => import('@/pages/OrderHistory/OrderHistory')) },

    {
        path: config.routes.admin,
        component: lazy(() => import('@/pages/Admin/AdminPage')),
        isPrivate: true,
    },
];
