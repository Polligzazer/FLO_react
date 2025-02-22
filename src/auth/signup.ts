import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error("Error signing up:", error);
  }
};