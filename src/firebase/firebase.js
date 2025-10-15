import { initializeApp } from 'firebase/app';
import { 
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getDocs,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
}from 'firebase/auth';

// app config

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// init Firebase
const app = initializeApp(firebaseConfig);


// init cloud firestore
const db = getFirestore(app);

// Export 

const auth = getAuth(app);
export { 
    db,
    collection,
    doc,
    auth,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    RecaptchaVerifier,
    signInWithPhoneNumber
};

export default app;
