import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

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

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const fetchItemReports = async (): Promise<any[]> => { // Adjust return type as needed
  try {
    const reportsCollection = collection(db, 'itemReports');
    const q = query(reportsCollection, orderBy('timestamp', 'desc')); // Order by timestamp (newest first)
    const querySnapshot = await getDocs(q);
    const reports = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return reports;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const fetchUserPosts = async (): Promise<any[]> => {  // Adjust return type as needed
  try {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('timestamp', 'desc')); // Order posts by timestamp (newest first)
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const createUser = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Error signing in:", error);
    return false;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
};

export const onAuthStateChangedListener = (callback: (user: any) => void) => { // Adjust type as needed
  return onAuthStateChanged(auth, callback);
};

export const checkUserRole = async (uid: string) => {
    try {
        const userRef = doc(db, 'users', uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            return docSnap.data().role;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error checking user role:", error);
        return null;
    }
};

export const setUserRole = async (uid: string, role: string) => {
    try {
        await setDoc(doc(db, 'users', uid), { role: role });
        return true;
    } catch (error) {
        console.error("Error setting user role:", error);
        return false;
    }
};