import { useState } from "react"
import useAuthstore from "../store/authstore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const useLikePost = (post) => {         // ❌ No destructuring here
    const [isupdating, setIsupdating] = useState(false);
    const authUser = useAuthstore((state) => state.user);

    // ✅ Handle undefined post safely
    const [likes, setLikes] = useState(post?.likes?.length || 0);
    const [isliked, setIsliked] = useState(post?.likes?.includes(authUser?.uid) || false);

    const showToast = useShowToast();

    const handleLikePost = async () => {
        if (isupdating || !authUser) return;

        setIsupdating(true);
        try {
            const postRef = doc(firestore, "posts", post.id);
            await updateDoc(postRef, {
                likes: isliked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
            });

            setIsliked(!isliked);
            setLikes((prev) => (isliked ? prev - 1 : prev + 1));
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsupdating(false);
        }
    };

    return { isliked, likes, handleLikePost, isupdating };
};

export default useLikePost;


