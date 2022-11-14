import { useEffect } from 'react';
import { signOut } from '~/firebase/authentication';
import { cx } from '~/util';
import db from '~/firebase/database';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

function Home() {
    useEffect(() => {
        db.store('products', {
            name: 'product 2',
            userRef: doc(getFirestore(), 'users/jMB4cCLGO62EtmVWFFRY'),
        });
    }, []);

    return (
        <h1 className={cx('text-center')}>
            <button onClick={signOut}>Logout</button>
            <button
                onClick={() => {
                    db.index('products').then((res) =>
                        res.forEach(async (item) => {
                            console.log(await (await getDoc(item.userRef)).data());
                        }),
                    );
                }}
            >
                Get
            </button>
        </h1>
    );
}

export default Home;
