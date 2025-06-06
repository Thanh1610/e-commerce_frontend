import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
    id: string;
    exp: number;
};

type DecodedResult = {
    decoded: JwtPayload | null;
    storedUser: string | null;
};

export const handleDecoded = (): DecodedResult => {
    const storedUser = localStorage.getItem('access_token');

    if (!storedUser) return { decoded: null, storedUser: null };

    try {
        const decoded = jwtDecode<JwtPayload>(storedUser);

        return { decoded, storedUser };
    } catch (error) {
        console.log(error);
        return { decoded: null, storedUser: null };
    }
};
