import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { publicRoutes } from './routes';
import MainLayout from './layouts/MainLayout/MainLayout';
import { Fragment } from 'react/jsx-runtime';
import { ToastContainer } from 'react-toastify';
import { useCallback, useEffect } from 'react';
import { getDetailUser } from './utils/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slices/userSlice';
import { handleDecoded } from './utils/helpers/handleDecoded';

export function App() {
    const dispatch = useDispatch();

    const handleGetDetailUser = useCallback(
        async (id: string, token: string) => {
            const res = await getDetailUser({ id, token });

            const payload = {
                ...res?.data?.data,
                access_token: token,
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
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout === null ? Fragment : route.layout || MainLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
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
