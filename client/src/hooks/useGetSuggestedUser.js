import { useEffect, useState } from "react"
import useAuthstore from "../store/authstore";
import useShowToast from "./useShowToast";
import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../Firebase/firebase";

const useGetSuggestedUser = () => {

 const [isloading,setIsloading] = useState(true); 
 const [suggestedUser,setSuggestedUser] = useState([]);
 const authUser = useAuthstore((state) => state.user);
 const showToast = useShowToast();

 useEffect(() => {
    const getSuggestedUser = async () => {
        setIsloading(true)
        try {
            const userRef = collection(firestore,"users")
            const followingList = Array.isArray(authUser.following) ? authUser.following : [];
            const q = query(
                userRef,
                where("uid", "not-in", [authUser.uid, ...followingList]),
                orderBy("uid"),
                limit(3) )

            const querSnapshot = await getDocs(q)
            const users = [];

            querSnapshot.forEach((doc) => {
                users.push({...doc.data(), id: doc.id})
            })

            setSuggestedUser(users)

        } catch (error) {
            showToast("Error", error.message, "error")
        }
        finally{
            setIsloading(false)
        }

    }

    if(authUser){
        getSuggestedUser();  // ✅ Call function inside useEffect, don't return it
    }

 },[authUser,showToast])

 return {isloading, suggestedUser}

}

export default useGetSuggestedUser
