import {  Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import {  InstagramMobileLogo } from '../../assets/icons/Constants';
import "../Style.css";
import useLogout from '../../hooks/useLogout';
import Sidebaritems from './Sidebaritems';


const Sidebar = () => {
 

  const {handleLogout, isloggingOut} = useLogout();
  

  return (
    <Box
      h="100vh"
      borderRight="1px solid"
      borderColor="gray"
      py={8}
      position="sticky"
      top={0}
      left={0}
      overflowY="auto" // Ensures scrolling
      px={{ base: 2, md: 5 }}
    >
      <Flex direction="column" gap={10} w="full" h="full">
        
        {/* Logos */}
        <Link to="/" as={RouterLink} display={{ base: "none", md: "block" }} cursor="pointer" style={{textDecoration:"none", marginLeft:"-10px"}}>
          {/* <InstagramLogo /> */}  <h5 className='grand' >Instagram </h5>
        </Link>
        <Link to="/" as={RouterLink} p={3} display={{ base: "block", md: "none" }} borderRadius={6} w={10} cursor="pointer">
          <InstagramMobileLogo />
        </Link>

        {/* Sidebar Items */}
        <Flex direction="column" gap={5} cursor="pointer">
          <Sidebaritems />
        </Flex>

        {/* Logout */}
        <Tooltip hasArrow label="Log Out" placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
          <Flex
          onClick={handleLogout}
            alignItems="center"
            gap={4}
            p={2}
            w={{ base: 10, md: "full" }}
            mt="auto"
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} />
            <Button display={{ base: "none", md: "block" }} 
            variant={'ghost'}
            isLoading = {isloggingOut}
            _hover={{bg:'transparent'}}>Log Out</Button>
          </Flex>
        </Tooltip>

      </Flex>
    </Box>
  );
};

export default Sidebar;
