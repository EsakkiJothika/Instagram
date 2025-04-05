import { Box, Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase';
import Navbar from '../components/Navbar/Navbar';

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== '/login' && user;
  const canRenderNavbar = !user && !loading && pathname !== '/login';

  const PageLayoutSpinner = () => {
    return (
      <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
        <Spinner size='xl' />
      </Flex>
    );
  };

  const checkingUserIsAuth = !user && loading;
  if(checkingUserIsAuth){
    return PageLayoutSpinner
  }

  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"} h="100vh" overflow="hidden"> {/* Removed position: relative */}
      
      {/* Sidebar */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }} h="100vh">
          <Sidebar />
        </Box>
      ) : null}

      {/* Navbar */}
      {canRenderNavbar ? <Navbar /> : null}

      {/* Page content */}
      <Box flex={1}  overflowY="auto" h="100vh">
        {children}
      </Box>
      
    </Flex>
  );
};

export default PageLayout;
