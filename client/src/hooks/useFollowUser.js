import { useEffect, useState } from "react"
import useAuthstore from "../store/authstore";
import useUserProfileStore from "../store/userprofilestore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const useFollowUser = (userID) => {
    const [isupdating,setIsupdating] = useState(false);
    const authUser = useAuthstore((state) => state.user);
    const setAuthUser = useAuthstore((state) => state.setUser)
    const {userProfile,setUserProfile} = useUserProfileStore();
    const [isfollowing,setIsfollowing] = useState(false);
    const showToast = useShowToast();


    const handleFollowUser = async () => {
        if (isupdating || !authUser || !userID) {
            showToast("Error", "Invalid user data", "error");
            return;
        }
    
        setIsupdating(true);
        try {
            // console.log("Auth User:", authUser);
            // console.log("User ID to follow/unfollow:", userID);
    
            const currentUserRef = doc(firestore, "users", authUser.uid);
            const userToFollowOrUnfollowRef = doc(firestore, "users", userID);
    
            // Check if the user exists in Firestore before updating
            const userSnap = await getDoc(userToFollowOrUnfollowRef);
            if (!userSnap.exists()) {
                showToast("Error", "User Not Found", "error");
                setIsupdating(false);
                return;
            }
    
            await updateDoc(currentUserRef, {
                following: isfollowing ? arrayRemove(userID) : arrayUnion(userID),
            });
    
            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isfollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
            });
    
            if (isfollowing) {
                // Unfollow
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userID),
                });
                if(userProfile){
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter(uid => uid !== authUser.uid),
                    });
                }
                
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        ...authUser,
                        following: authUser.following.filter(uid => uid !== userID),
                    })
                );
                setIsfollowing(false);
            } else {
                // Follow
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userID],
                });
                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid],
                    });
                }
                
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        ...authUser,
                        following: [...authUser.following, userID],
                    })
                );
                setIsfollowing(true);
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsupdating(false);
        }
    };
    


    useEffect(()=>{
        if(authUser){
            const isfollowing = authUser.following.includes(userID)
            setIsfollowing(isfollowing)
        }
    },[authUser,userID])

    return {isupdating,isfollowing,setIsfollowing, handleFollowUser}
    
    }

    


export default useFollowUser
