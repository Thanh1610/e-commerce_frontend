import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import RegisterForm from './RegisterForm/RegisterForm';
import { Link } from 'react-router';
import config from '@/config';
import { ArrowLeft } from 'lucide-react';

function RegisterPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Đăng ký tài khoản của bạn</CardTitle>
                    <CardDescription>Nhập email của bạn bên dưới để đăng ký </CardDescription>
                    <CardAction>
                        <Link to={config.routes.login}>
                            <Button variant="link">Đăng nhập</Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
                <Button variant="outline">
                    <ArrowLeft size={20} />
                    Quay lại
                </Button>
            </Card>
        </div>
    );
}

export default RegisterPage;
