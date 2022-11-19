const isLocal = () => window.location.hostname === 'localhost';

const isProd = () => window.location.hostname === 'caro-online.vercel.app';

const config = {};

if (isLocal()) {
    Object.assign(config, {
        firebase: {
            apiKey: 'AIzaSyA1vCGeJ5i1fRMBFDh8XZx2K23IT5RE6GU',
            authDomain: 'caro-online-dev.firebaseapp.com',
            databaseURL: 'https://caro-online-dev-default-rtdb.firebaseio.com',
            projectId: 'caro-online-dev',
            storageBucket: 'caro-online-dev.appspot.com',
            messagingSenderId: '922227726613',
            appId: '1:922227726613:web:6a43ca63a73a56c9cf711c',
        },
    });
}

if (isProd()) {
    Object.assign(config, {
        firebase: {
            apiKey: 'AIzaSyABzATHROCf55eLLOzRIXbuL4F2sXBmdjY',
            authDomain: 'caro-online-b3f48.firebaseapp.com',
            databaseURL: 'https://caro-online-b3f48-default-rtdb.firebaseio.com/',
            projectId: 'caro-online-b3f48',
            storageBucket: 'caro-online-b3f48.appspot.com',
            messagingSenderId: '385732348906',
            appId: '1:385732348906:web:039f58c550963c4fdfc093',
        },
    });
}

export default config;
