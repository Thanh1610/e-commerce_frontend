import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { publicRoutes } from './routes';
import MainLayout from './layouts/MainLayout/MainLayout';
import { Fragment } from 'react/jsx-runtime';

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
            </div>
        </Router>
    );
}
