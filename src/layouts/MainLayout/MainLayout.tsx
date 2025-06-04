import Header from '@/layouts/components/Header';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

function MainLayout({ children }: Props) {
    return (
        <div className="bg-[#f2f4f7]">
            <Header />
            {children}
        </div>
    );
}

export default MainLayout;
