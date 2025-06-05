import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { publicRoutes } from './routes';
import MainLayout from './layouts/MainLayout/MainLayout';
import { Fragment } from 'react/jsx-runtime';
import { ToastContainer } from 'react-toastify';

export function App() {
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
                    position="top-right"
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
