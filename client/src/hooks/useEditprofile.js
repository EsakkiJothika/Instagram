import { useState } from "react";
import useAuthstore from "../store/authstore";
import useShowToast from "./useShowToast";
import { firestore } from "../Firebase/firebase"; // Removed storage import
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userprofilestore";

const useEditprofile = () => {
  const [isupdating, setIsupdating] = useState(false);
  const authUser = useAuthstore((state) => state.user);
  const showToast = useShowToast();
  const setAuthUser = useAuthstore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const editprofile = async (editeddata, selectedfile) => {
    if (isupdating || !authUser) return;

    setIsupdating(true);

    const userDocRef = doc(firestore, "users", authUser.uid);
    let URL = authUser.profilepicURL; // Default to existing profile pic

    try {
      if (selectedfile) {
        const formData = new FormData();
        formData.append("file", selectedfile);
        formData.append("upload_preset", "instagramCloneUploads"); // Set in Cloudinary
        formData.append("cloud_name", "dazba41e6");
        formData.append("folder", "myUploads"); 

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dazba41e6/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        URL = data.secure_url; // Get the uploaded image URL
        // console.log(data);
        
      }

      const updateduser = {
        ...authUser,
        fullname: editeddata.fullname || authUser.fullname,
        username: editeddata.username || authUser.username,
        bio: editeddata.bio || authUser.bio,
        profilepicURL: URL, // Use Cloudinary URL
      };

      await updateDoc(userDocRef, updateduser);
      localStorage.setItem("user-info", JSON.stringify(updateduser));
      setAuthUser(updateduser);
      setUserProfile(updateduser);
      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsupdating(false);
    }
  };

  return { editprofile, isupdating };
};

export default useEditprofile;
