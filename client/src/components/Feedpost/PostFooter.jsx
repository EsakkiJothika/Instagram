import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/icons/Constants";

const PostFooter = ({ username, isprofilepage, mbValue }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);

  const handlelikes = () => {
    setLiked(!liked);

    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
  };

  return (
    <Flex flexDirection="column" flex={1} >
      {/* Ensures flex behavior */}
      <Box mb={mbValue} marginTop={"auto"}>
        <Flex alignItems={"center"} gap={4} w={"full"} mt={4} mb={2} pt={0}>
          <Box onClick={handlelikes} cursor={"pointer"} fontSize={18}>
            {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
          </Box>
          <Box cursor={"pointer"} fontSize={18}>
            <CommentLogo />
          </Box>
        </Flex>

        <Text fontWeight={400} fontSize={"sm"}>
          {likes} likes
        </Text>

        {!isprofilepage && (
          <>
            <Text fontWeight={700} fontSize={"sm"}>
              {username}{" "}
              <Text as={"span"} fontWeight={400}>
                Feeling good
              </Text>
            </Text>
            <Text color={"gray"} fontSize={"sm"}>
              View all 1,000 comments
            </Text>
          </>
        )}

        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              fontSize={14}
              placeholder="Add a comment..."
            />
            <InputRightElement>
              <Button
                bg={"transparent"}
                color={"blue.500"}
                _hover={{ color: "gray" }}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PostFooter;
