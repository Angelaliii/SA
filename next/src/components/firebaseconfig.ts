import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD99RMkMhuiGp9vC_RoYcMt_OMJVFnd9Yg",
  authDomain: "fjusa-75609.firebaseapp.com",
  projectId: "fjusa-75609",
  storageBucket: "fjusa-75609.firebasestorage.app",
  messagingSenderId: "241447713348",
  appId: "1:241447713348:web:4b35da421dfaf13d865a11"
};
// Initialize Firebase App
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;