import { useToast } from '@chakra-ui/react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase';
import useAuthstore from '../store/authstore';

const useLogout = () => {

    const [signOut, isloggingOut, error] = useSignOut(auth);
    const showToast = useToast();
    const logoutUser = useAuthstore((state) => state.logout)
    const handleLogout = async () =>{
        try {
            await signOut();
            localStorage.removeItem('user-info')
            logoutUser();
            
        } catch (error) {

            showToast("Error", error.message, "error")
            
        }
    }
  return {handleLogout,isloggingOut,error}
}

export default useLogout
