import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Flex h="100vh" overflow="hidden"> {/* Removed position: relative */}
      
      {/* Sidebar */}
      {pathname !== "/login" && (
        <Box w={{ base: "70px", md: "240px" }} h="100vh">
          <Sidebar />
        </Box>
      )}

      {/* Page content */}
      <Box flex={1}  overflowY="auto" h="100vh">
        {children}
      </Box>
      
    </Flex>
  );
};

export default PageLayout;
