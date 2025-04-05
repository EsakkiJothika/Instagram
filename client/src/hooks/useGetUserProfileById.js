import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const useGetUserProfileById = (userID) => {
  const [isloading, setIsloading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getProfile = async () => {
      if (!userID) return; // Avoid unnecessary requests if userID is null/undefined

      setIsloading(true);
      setUserProfile(null);

      try {
        // 🔥 Correct way: Get the document reference first
        const userRef = doc(firestore, "users", userID);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
       
          
        } else {
          showToast("Error", "User profile not found", "error");
        }

      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsloading(false);
      }
    };

    getProfile();
  }, [showToast, userID]);

  return { isloading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
