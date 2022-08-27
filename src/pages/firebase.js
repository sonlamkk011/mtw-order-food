import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAAWqFhpELyJwuVAAOXGaBnGE3O9NFpOxs",
    authDomain: "mtw-order.firebaseapp.com",
    projectId: "mtw-order",
    storageBucket: "mtw-order.appspot.com",
    messagingSenderId: "776633430243",
    appId: "1:776633430243:web:ba440bbba2593ba60515d6",
    measurementId: "G-BLERWSCE6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const authentication = getAuth(app);