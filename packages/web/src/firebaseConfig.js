import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ideia-plus.firebaseapp.com",
  projectId: "ideia-plus",
  storageBucket: "ideia-plus.firebasestorage.app",
  messagingSenderId: "739259861199",
  appId: "1:739259861199:web:3e86371dfac85efe340fba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };