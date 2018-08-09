import * as firebase from 'firebase';
import expenses from '../tests/fixtures/expenses';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_MESSAGING_SENDER_ID,
    messagingSenderId: process.env.FIREABSE_STORAGE_BUCKET
};

firebase.initializeApp(config);

const database = firebase.database();




export {firebase,database as default};