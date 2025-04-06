import { useState } from "react";
import useAuthstore from "../store/authstore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";
import usePostStore from "../store/poststore"; // ADD THIS

const useLikePost = (post) => {
    const [isupdating, setIsupdating] = useState(false);
    const authUser = useAuthstore((state) => state.user);
    const showToast = useShowToast();
    const addlike = usePostStore((state) => state.addlike); // ADD THIS

    const [likes, setLikes] = useState(post?.likes?.length || 0);
    const [isliked, setIsliked] = useState(post?.likes?.includes(authUser?.uid) || false);

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
            addlike(post.id, authUser.uid); // 🔥 IMMEDIATE LOCAL UPDATE
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsupdating(false);
        }
    };

    return { isliked, likes, handleLikePost, isupdating };
};

export default useLikePost;
