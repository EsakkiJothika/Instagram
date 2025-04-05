import { useEffect, useState } from "react"
import usePostStore from "../store/poststore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userprofilestore";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const useGetUserPost = () => {
 
    const [isloading,setIsloading] = useState(true);
    const {posts,setposts} = usePostStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        const getPosts = async () => {
            if(!userProfile){
                return
            }
            setIsloading(true);
            setposts([]);
            try {
                const q = query(collection(firestore,"posts"),where("createdBy","==",userProfile.uid))
                const querySnapshot = await getDocs(q)

                const posts = [];

                querySnapshot.forEach((doc) => {
                    posts.push({...doc.data(), id:doc.id})
                })

                posts.sort((a,b) => b.createdAt - a.createdAt)
                
                setposts(posts)


            } catch (error) {
                showToast("Error", error.message, "error");
                setIsloading(true);
                setposts([]);
            } finally{
                setIsloading(false);
            }
            
        }

        getPosts();

    }, [setposts,userProfile,showToast])

    return {isloading,posts};
};

export default useGetUserPost;
