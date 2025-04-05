import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useAuthstore from "../store/authstore";
import useShowToast from "./useShowToast";
import { firestore } from "../Firebase/firebase";
import usePostStore from "../store/poststore";
import { useState } from "react";


const usePostComment = () => {
   const [iscommenting,setIscommenting] = useState(false);
   const showToast = useShowToast();
   const authUser = useAuthstore((state) => state.user);
   const addComment = usePostStore((state) => state.addcomment)

   const handlePostComment = async (postID,comment) =>{

    if(iscommenting){
        return
    }
    if(!authUser){
        return showToast("Error", "You have to login to comment on this post", "error")
    }

    setIscommenting(true)

    const newComment = {
        comment : comment,
        createdAt : Date.now(),
        createdBy : authUser.uid,
        postID : postID
    }

    try {

        await updateDoc(doc(firestore,"posts",postID),{
            comment: arrayUnion(newComment)
        })

        addComment(postID,comment)

    } catch (error) {

        showToast("Error", error.message, "error")
        
    } finally{
        setIscommenting(false)
    }
   }

   return {iscommenting, handlePostComment}
}

export default usePostComment
