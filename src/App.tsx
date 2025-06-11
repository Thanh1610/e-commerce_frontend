import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import { ToastContainer } from 'react-toastify';
import { useCallback, useEffect } from 'react';
import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import type { UserState } from '@/redux/slices/userSlice';

import MainLayout from './layouts/MainLayout/MainLayout';
import { routes } from './routes';
import { getDetailUser } from './services/userApi';
import { setUser } from '@/redux/slices/userSlice';
import { handleDecoded } from '@/utils/helpers/handleDecoded';
import Loading from '@/components/Loading/Loading';

export function App() {
    const dispatch = useDispatch();
    const user: UserState = useSelector((state: RootState) => state.user);

    const handleGetDetailUser = useCallback(
        async (id: string, token: string) => {
            const res = await getDetailUser({ id, token });

            const payload = {
                ...res?.data?.data,
            };

            dispatch(setUser(payload));
        },
        [dispatch],
    );

    useEffect(() => {
        const { decoded, storedUser } = handleDecoded();

        try {
            if (decoded?.id && storedUser) {
                handleGetDetailUser(decoded?.id, storedUser);
            }
        } catch (error) {
            console.log(error);
        }
    }, [handleGetDetailUser]);

    return (
        <Router>
            <div>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {routes.map((route, index) => {
                            const Layout = route.layout === null ? Fragment : route.layout || MainLayout;
                            const Page = route.component;

                            const isCheckauth = !route.isPrivate || user?.isAdmin;
                            return (
                                <Route
                                    key={index}
                                    path={isCheckauth ? route.path : undefined}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Suspense>
                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="light"
                />
            </div>
        </Router>
    );
}
