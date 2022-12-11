import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyB6PXwF0PgDt3oWXxdZX0zh3S--tTNjiOM",
    authDomain: "p-m-zone.firebaseapp.com",
    projectId: "p-m-zone",
    storageBucket: "p-m-zone.appspot.com",
    messagingSenderId: "683574733906",
    appId: "1:683574733906:web:806216eb6116f484b5038b",
    measurementId: "G-QJM3NNF22D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);