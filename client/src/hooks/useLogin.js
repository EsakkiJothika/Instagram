import { useState } from "react";
import useShowToast from "./useShowToast";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthstore from "../store/authstore";

const useLogin = () => {
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [loading, setLoading] = useState(false); // <-- custom loading state
  const [error, setError] = useState(null);

  const showToast = useShowToast();
  const loginUser = useAuthstore((state) => state.login);

  const login = async (logindata) => {
    if (!logindata.email || !logindata.password) {
      showToast("Error", "Please fill out all the fields", "error");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const userCred = await signInWithEmailAndPassword(
        logindata.email,
        logindata.password
      );

      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid);
        const docSnap = await getDoc(docRef);

        const userData = docSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userData));
        loginUser(userData);
      }
    } catch (err) {
      setError(err);
      showToast("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};

export default useLogin;
