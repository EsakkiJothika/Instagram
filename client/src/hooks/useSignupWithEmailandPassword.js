import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../Firebase/firebase';
import { doc, getDocs, setDoc } from 'firebase/firestore';
import { collection, query, where } from "firebase/firestore";
import useShowToast from './useShowToast';
import useAuthstore from '../store/authstore';

const useSignupWithEmailandPassword = () => {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthstore((state) => state.login);

    


    const signup = async (signdata) => {
        if (!signdata.email || !signdata.password || !signdata.username || !signdata.fullname) {
            showToast("Error", "Please fill out all the fields", "error");
            return;
        }

        // Create a reference to the cities collection

        const usersRef = collection(firestore, "users");

    // Create a query against the collection.
        const q = query(usersRef, where("username", "==", signdata.username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            showToast("Error", "Username already exist", "error");
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(signdata.email, signdata.password);

            if (!newUser) {
                showToast("Error", "Signup failed, please try again.", "error");
                return;
            }

            // Prepare user document
            const userDoc = {
                uid: newUser.user.uid,
                email: signdata.email,
                username: signdata.username,
                fullname: signdata.fullname,
                bio: "",
                profilepicURL: "",
                followers: [],
                following: [],
                posts: [],
                createdAt: Date.now(),
            };

            // Store user data in Firestore
            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

            // Save user info in localStorage
            localStorage.setItem("user-info", JSON.stringify(userDoc));

            // Update auth state
            loginUser(userDoc);

            showToast("Success", "Signup successful!", "success");
        } catch (err) {
            showToast("Error", err.message, "error");
        }
    };

    return { loading, error, signup };
};

export default useSignupWithEmailandPassword;
