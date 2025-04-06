import { useEffect, useState } from "react"
import usePostStore from "../store/poststore";
import useAuthstore from "../store/authstore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userprofilestore";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";


const useGetFeedPost = () => {

    const [isloading,setIsloading] = useState(true);
    const {posts,setposts} = usePostStore();
    const authUser = useAuthstore((state) => state.user);
    const showToast = useShowToast();
    const {setuserProfile} = useUserProfileStore();

    useEffect(() => {

      const getFeedPosts = async () => {

        setIsloading(true)
        if (authUser.following.length === 0) {
          setIsloading(false)
          setposts([])

          showToast("Information", "Once you started following user you will get post feed", "info");
          return; // Very important: stop the function here!
        }

        const q = query(collection(firestore,"posts"),where("createdBy","in",authUser.following))

        try {
          const querySnapshot = await getDocs(q)
          const feedPosts = [];
          
          querySnapshot.forEach((doc) => {
            feedPosts.push({id:doc.id,...doc.data()})
          })

          feedPosts.sort((a,b) => b.createdAt - a.createdAt);
          setposts(feedPosts);

        } catch (error) {
          showToast("Error",error.message,"error")
        } finally{
          setIsloading(false)
        }
      }

      if (authUser) {
        getFeedPosts();
      }

    }, [authUser,showToast,setposts,setuserProfile])
    
  return {isloading, posts};
}

export default useGetFeedPost
