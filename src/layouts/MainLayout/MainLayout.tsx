import Header from '@/layouts/components/Header/Header';
import Footer from '@/layouts/components/Footer/Footer';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

function MainLayout({ children }: Props) {
    return (
        <div className="flex min-h-screen flex-col bg-[#f2f4f7]">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}

export default MainLayout;
