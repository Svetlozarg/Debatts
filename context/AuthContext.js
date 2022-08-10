import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";

// Create AuthContext
const AuthContext = createContext({});

// Use Context
export const useAuth = () => useContext(AuthContext);

// Create AuthContextProvider
export const AuthContextProvider = ({ children }) => {
  // State for user
  const [user, setUser] = useState(null);
  // State for loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Unsubscribe function
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If user set uid, email, name
      // Else null
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register Function
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
