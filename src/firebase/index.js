// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

import config from '~/config';

// Initialize Firebase
const app = initializeApp(config.firebase);
getDatabase(app);
getFirestore(app);
