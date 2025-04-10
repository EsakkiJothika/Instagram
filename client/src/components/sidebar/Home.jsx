import { Box, Link, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const Home = () => {
  return (
    <Tooltip
      hasArrow
      label={"Home"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        as={RouterLink}
        to={"/"}
        display={"flex"}
        alignItems="center"
        gap={4}
        p={2}
        w={{ base: 10, md: "full" }}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <AiFillHome size={25} />
        <Box display={{ base: "none", md: "block" }}>Home</Box>
      </Link>
    </Tooltip>
  );
};

export default Home;
