// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyABzATHROCf55eLLOzRIXbuL4F2sXBmdjY',
    authDomain: 'caro-online-b3f48.firebaseapp.com',
    projectId: 'caro-online-b3f48',
    storageBucket: 'caro-online-b3f48.appspot.com',
    messagingSenderId: '385732348906',
    appId: '1:385732348906:web:039f58c550963c4fdfc093',
    databaseURL: 'https://caro-online-b3f48-default-rtdb.firebaseio.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getDatabase(app);
