import { getAuth } from 'firebase/auth';
import { useEffect, useMemo, useState } from 'react';

import { AuthContext } from '~/contexts';
import { storage } from '~/util';

function AuthProvider({ children }) {
    const persistedUser = storage.get('user');
    const [currentUser, setCurrentUser] = useState(persistedUser || null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const auth = getAuth();
        auth.onAuthStateChanged(
            (user) => {
                storage.set('user', user);
                setCurrentUser(user);
                setIsLoading(false);
            },
            () => {
                storage.clear();
                setCurrentUser(null);
                setIsLoading(false);
            },
        );
    }, []);

    const value = useMemo(() => ({ currentUser }), [currentUser]);

    if (isLoading) {
        return null;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
