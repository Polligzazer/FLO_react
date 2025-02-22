import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging out:", error.message);
    } else {
      console.error("An unknown error occurred during logout:", error);
    }
  }
};
