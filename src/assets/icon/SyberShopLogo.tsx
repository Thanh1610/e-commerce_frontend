import React from 'react';

const SyberShopLogo: React.FC<{ width?: number; height?: number }> = ({ width = 180, height = 40 }) => (
    <svg width={width} height={height} viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cart icon - minimalist */}
        <g>
            <rect x="4" y="12" width="18" height="12" rx="3" fill="#2563eb" />
            <circle cx="8" cy="28" r="2" fill="#2563eb" />
            <circle cx="18" cy="28" r="2" fill="#2563eb" />
            <rect x="7" y="16" width="10" height="2" rx="1" fill="#fff" />
        </g>
        {/* Text */}
        <text x="30" y="28" fontFamily="Segoe UI, Arial, sans-serif" fontSize="22" fontWeight="bold" fill="#2563eb">
            Syber
        </text>
        <text x="90" y="28" fontFamily="Segoe UI, Arial, sans-serif" fontSize="22" fontWeight="bold" fill="#111827">
            Shop
        </text>
    </svg>
);

export default SyberShopLogo;
