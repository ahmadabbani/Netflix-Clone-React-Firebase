import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  async function signUp({ email, password, membership }) {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        membership
      );
      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        email: email,
        savedShows: [],
        avatar: "",
        membership: membership,
        date: Date.now(),
      });
    } catch (error) {
      throw error;
    }
  }
  async function logIn({ email, password }) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function userAuth() {
  return useContext(AuthContext);
}
