import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyC9m1EKq30z2AvJxaSmCALpsEGKa3lc5l0",
  authDomain: "eshop-6f785.firebaseapp.com",
  projectId: "eshop-6f785",
  storageBucket: "eshop-6f785.appspot.com",
  messagingSenderId: "940579219046",
  appId: "1:940579219046:web:242175d1cf87ff63212fa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
