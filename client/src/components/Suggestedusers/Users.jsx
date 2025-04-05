import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import React from "react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthstore from "../../store/authstore";
import { Link } from "react-router-dom";

const Users = ({ user, setUser }) => {
  const { isupdating, isfollowing, setIsfollowing, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthstore((state) => state.user);

  const onFollowUser = async () => {
    await handleFollowUser();

    if (setUser) {
      setUser({
        ...user,
        followers: isfollowing
          ? user.followers.filter((follower) => follower.uid !== authUser.uid)
          : [...user.followers, authUser],
      });
    }

    setIsfollowing((prev) => !prev); // ✅ Manually toggle state
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      gap={4}
    >
      {/* Left Section */}
      <Flex alignItems={"center"} gap={4} flex={1}>
        <Link to={`/${user.username}`} >
        <Avatar src={user.profilepicURL} size={"md"} />
        </Link>
        
        <VStack spacing={0} alignItems={"flex-start"}>
          {user && (
            <Link to={`/${user.username}`} >
            <Box fontSize={12} fontWeight={"bold"}>
              {user.username}
            </Box>
            </Link>
          )}
          {user && (
            <Box fontSize={11} color={"gray.500"}>
              {user.followers.length} followers
            </Box>
          )}
        </VStack>
      </Flex>

      {/* Right Section (Button) */}
      {authUser.uid !== user.uid && (
        <Button
          bg={"transparent"}
          border={"1px solid gray"}
          fontSize={14}
          fontWeight={"bold"}
          h={"30px"}
          color={"blue.400"}
          flexShrink={0} // Prevents button from shrinking
          isLoading={isupdating}
          onClick={onFollowUser}
        >
          {isfollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default Users;
