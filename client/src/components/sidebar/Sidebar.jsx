import { Avatar, Box, Flex, Link, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import p from "../../assets/images/profilepic.png";
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/icons/Constants';

const Sidebar = () => {
  const sidebaritems = [
    { icon: <AiFillHome size={25} />, text: "Home", link: "/" },
    { icon: <SearchLogo />, text: "Search" },
    { icon: <NotificationsLogo />, text: "Notification" },
    { icon: <CreatePostLogo />, text: "Create" },
    { icon: <Avatar size={'sm'} name='jothi' src={p} />, text: "Profile" }
  ];

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
        <Link to="/" as={RouterLink} display={{ base: "none", md: "block" }} cursor="pointer">
          <InstagramLogo />
        </Link>
        <Link to="/" as={RouterLink} p={3} display={{ base: "block", md: "none" }} borderRadius={6} w={10} cursor="pointer">
          <InstagramMobileLogo />
        </Link>

        {/* Sidebar Items */}
        <Flex direction="column" gap={5} cursor="pointer">
          {sidebaritems.map((items, index) => (
            <Tooltip key={index} hasArrow label={items.text} placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
              <Link
                as={RouterLink}
                to={items.link || null}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                w={{ base: 10, md: "full" }}
                _hover={{ bg: "whiteAlpha.400" }}
                borderRadius={6}
                justifyContent={{ base: "center", md: "flex-start" }}
              >
                {items.icon}
                <Box display={{ base: "none", md: "block" }}>{items.text}</Box>
              </Link>
            </Tooltip>
          ))}
        </Flex>

        {/* Logout */}
        <Tooltip hasArrow label="Log Out" placement="right" ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
          <Link
            as={RouterLink}
            to="/login"
            display="flex"
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
            <Box display={{ base: "none", md: "block" }}>Log Out</Box>
          </Link>
        </Tooltip>

      </Flex>
    </Box>
  );
};

export default Sidebar;
