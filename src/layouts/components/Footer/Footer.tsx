import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router';

function Footer() {
    return (
        <footer className="mt-10 bg-neutral-900 text-neutral-200">
            <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
                {/* Logo & Slogan */}
                <div>
                    <Link to="/" className="mb-2 inline-block text-xl font-bold tracking-wide text-white">
                        SyberShop
                    </Link>
                    <p className="mt-2 text-sm text-neutral-400">
                        SyberShop - Nền tảng mua sắm trực tuyến hiện đại, giá tốt, giao hàng nhanh.
                    </p>
                </div>
                {/* About */}
                <div>
                    <h4 className="mb-2 font-semibold">Về chúng tôi</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <Link to="/about" className="hover:underline">
                                Giới thiệu
                            </Link>
                        </li>
                        <li>
                            <Link to="/news" className="hover:underline">
                                Tin tức
                            </Link>
                        </li>
                        <li>
                            <Link to="/careers" className="hover:underline">
                                Tuyển dụng
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Support */}
                <div>
                    <h4 className="mb-2 font-semibold">Hỗ trợ khách hàng</h4>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <Link to="/faq" className="hover:underline">
                                Câu hỏi thường gặp
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:underline">
                                Liên hệ
                            </Link>
                        </li>
                        <li>
                            <Link to="/shipping" className="hover:underline">
                                Vận chuyển & Giao nhận
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Social */}
                <div>
                    <h4 className="mb-2 font-semibold">Kết nối với chúng tôi</h4>
                    <div className="mt-2 flex space-x-3">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook className="h-5 w-5 hover:text-blue-400" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-5 w-5 hover:text-pink-400" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                            <Youtube className="h-5 w-5 hover:text-red-500" />
                        </a>
                        <a href="mailto:support@sybershop.com" aria-label="Email">
                            <Mail className="h-5 w-5 hover:text-green-400" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-neutral-700 py-4 text-center text-sm text-neutral-400">
                © {new Date().getFullYear()} SyberShop. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
