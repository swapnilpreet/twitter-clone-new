// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZciLfMox5lXLFl4zpcN4mxUyEvErzCAY",
  authDomain: "teitter-clone-7202b.firebaseapp.com",
  projectId: "teitter-clone-7202b",
  storageBucket: "teitter-clone-7202b.appspot.com",
  messagingSenderId: "998005135443",
  appId: "1:998005135443:web:da114d7d71dd22f31b4ea6",
  measurementId: "G-8HMSJ67XGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;
