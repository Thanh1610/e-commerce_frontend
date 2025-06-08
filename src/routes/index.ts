import HomePage from '@/pages/Home/HomePage';
import ProductsPage from '@/pages/Products/ProductsPage';
import OrderPage from '@/pages/Order/OrderPage';

import config from '@/config';
import NotFoundPage from '@/pages/NotFound/ProductsPage';
import LoginPage from '@/pages/Login/LoginPage';
import RegisterPage from '@/pages/Register/RegisterPage';
import DetailsPage from '@/pages/Details/DetailsPage';
import ProfilePage from '@/pages/Profile/ProfilePage';

export const publicRoutes = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.products, component: ProductsPage },
    { path: config.routes.order, component: OrderPage },
    { path: config.routes.login, component: LoginPage, layout: LoginPage },
    { path: config.routes.register, component: RegisterPage, layout: RegisterPage },
    { path: config.routes.details, component: DetailsPage },
    { path: config.routes.profile, component: ProfilePage },

    { path: config.routes.notfound, component: NotFoundPage, layout: NotFoundPage },
];
