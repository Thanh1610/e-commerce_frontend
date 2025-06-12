import { createContext, useContext } from 'react';

export const UserContext = createContext<{ refreshUsers: () => void } | null>(null);

export const useUserContext = () => {
    const user = useContext(UserContext);
    if (!user) throw new Error('useUserContext phải nằm trong UserProvider');
    return user;
};
