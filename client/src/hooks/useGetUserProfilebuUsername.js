import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore"; // ✅ use getDocs
import { firestore } from "../Firebase/firebase";
import useUserProfileStore from "../store/userprofilestore";

const useGetUserProfileByUsername = (username) => {
  const [isloading, setIsloading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    if (!username) return; // ✅ Prevents running query with undefined username
  
    const getUserProfile = async () => {
      setIsloading(true);
      try {
        const q = query(collection(firestore, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          setUserProfile(null);
          return;
        }
  
        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });
  
        setUserProfile(userDoc);
        
  
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsloading(false);
      }
    };
  
    getUserProfile();
  }, [setUserProfile, username, showToast]);
  

  return { isloading, userProfile };
};

export default useGetUserProfileByUsername;
