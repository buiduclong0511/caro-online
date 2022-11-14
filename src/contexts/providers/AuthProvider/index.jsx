import { getAuth } from 'firebase/auth';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '~/contexts';
import { paths } from '~/routes';
import { storage } from '~/util';

function AuthProvider({ children }) {
    const persistedUser = storage.get('user');
    const [currentUser, setCurrentUser] = useState(persistedUser || null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        const auth = getAuth();
        auth.onAuthStateChanged(
            (user) => {
                storage.set('user', user);
                setCurrentUser(user);
                setIsLoading(false);
                if (!user) {
                    navigate(paths.login, { replace: true });
                }
            },
            () => {
                storage.clear();
                setCurrentUser(null);
                setIsLoading(false);
                navigate(paths.login, { replace: true });
            },
        );
    }, [navigate]);

    const value = useMemo(() => ({ currentUser }), [currentUser]);

    if (isLoading) {
        return null;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
