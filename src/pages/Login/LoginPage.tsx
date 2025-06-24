import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/layouts/components/LoginForm/LoginForm';
import { Link } from 'react-router';
import config from '@/config';

function LoginPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Đăng nhập vào tài khoản của bạn</CardTitle>
                    <CardDescription>Nhập email của bạn bên dưới để đăng nhập vào tài khoản của bạn</CardDescription>
                    <CardAction>
                        <Link to={config.routes.register}>
                            <Button variant="link">Đăng ký</Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <Link to={config.routes.home}>
                    <Button variant="outline" className="flex w-full items-center justify-center">
                        <ArrowLeft size={20} />
                        Quay lại
                    </Button>
                </Link>
            </Card>
        </div>
    );
}

export default LoginPage;
