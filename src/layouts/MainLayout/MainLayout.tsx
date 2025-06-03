import Header from '@/layouts/components/Header';
import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

function MainLayout({ children }: Props) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default MainLayout;
