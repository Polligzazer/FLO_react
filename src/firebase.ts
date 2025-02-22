// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDz6LeWADSUw5rEaviovS5gKdjvUX_Dnis",
  authDomain: "flo-services.firebaseapp.com",
  databaseURL: "https://flo-services-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flo-services",
  storageBucket: "flo-services.firebasestorage.app",
  messagingSenderId: "158446598194",
  appId: "1:158446598194:web:e62a4cccfd49778466e42b",
  measurementId: "G-J3D4JEN861"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;