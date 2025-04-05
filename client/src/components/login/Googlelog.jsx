import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import g from "../../assets/images/google.png";
import useShowToast from "../../hooks/useShowToast";
import useAuthstore from "../../store/authstore";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from '../../Firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Googlelog = ({ prefix }) => {
  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthstore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle(); // ✅ Correct function name

      if (error) {
        showToast("Error", error.message, "error");
        return;
      }

      if (!newUser) {
        showToast("Error", "Google sign-in failed", "error");
        return;
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      let userDoc;

      if (userSnap.exists()) {
        userDoc = userSnap.data();
        
      } else {
        userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0], // aadhini
          fullname: newUser.user.displayName || "No Name",
          bio: "",
          profilepicURL: newUser.user.photoURL || "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        // Store new user in Firestore
        await setDoc(userRef, userDoc);
      }

      // Save user info in localStorage
      localStorage.setItem("user-info", JSON.stringify(userDoc));

      // Update auth state
      loginUser(userDoc);

    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      my={1}
      cursor={"pointer"}
      onClick={handleGoogleAuth}
    >
      <Image src={g} alt="google logo" w={5} />
      <Text mx={2} color={"blue.500"}>
        {prefix} with Google
      </Text>
    </Flex>
  );
};

export default Googlelog;
