import HomePage from '@/pages/Home/HomePage';
import ProductsPage from '@/pages/Products/ProductsPage';
import OrderPage from '@/pages/Order/OrderPage';

import config from '@/config';
import NotFoundPage from '@/pages/NotFound/ProductsPage';

export const publicRoutes = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.products, component: ProductsPage },
    { path: config.routes.order, component: OrderPage },
    { path: config.routes.notfound, component: NotFoundPage, layout: NotFoundPage },
];
