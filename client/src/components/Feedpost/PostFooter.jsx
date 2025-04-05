import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/icons/Constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthstore from "../../store/authstore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import Commentsmodal from "../Modals/Commentsmodal";

const PostFooter = ({ post, username, isprofilepage, creatorprofile, mbValue }) => {

  const [comment,setComment] = useState("");
  const {iscommenting, handlePostComment} = usePostComment();
  const authUser = useAuthstore((state) => state.user);
  const commentRef = useRef(null);
  const {handleLikePost, isliked, likes} = useLikePost(post);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleSubmitComment = async () => {

    await handlePostComment(post.id,comment);
    setComment("")

  } 



  return (
    <Flex flexDirection="column" flex={1} >
      {/* Ensures flex behavior */}
      <Box mb={mbValue} marginTop={"auto"}>
        <Flex alignItems={"center"} gap={4} w={"full"} mt={4} mb={2} pt={0}>
          <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
            {!isliked ? <NotificationsLogo /> : <UnlikeLogo />}
          </Box>
          <Box cursor={"pointer"} fontSize={18} onClick={() => {commentRef.current.focus()}} >
            <CommentLogo  />
          </Box>
        </Flex>

        <Text fontWeight={400} fontSize={"sm"}>
          {likes} likes
        </Text>

        {isprofilepage && (
				<Text fontSize='12' color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}

        {!isprofilepage && (
          <>
            <Text fontWeight={700} fontSize={"sm"}>
              {creatorprofile?.username}{" "}
              <Text as={"span"} fontWeight={400}>
                {post?.caption}
              </Text>
            </Text>
           {post?.comment.length > 0 && (
             <Text color={"gray"} fontSize={"sm"} cursor={"pointer"} onClick={onOpen} >
             View all {post?.comment.length} comments
           </Text>
           )}

           {/* COMMENTS MODAL ONLY ON HOME PAGE */}

           {isOpen ? ( <Commentsmodal isOpen={isOpen} onClose={onClose} post={post} />) : null}

          </>
        )}


        {authUser && (
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
              onChange={(e) => {setComment(e.target.value)}}
              value={comment}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                bg={"transparent"}
                color={"blue.500"}
                _hover={{ color: "gray" }}
                onClick={handleSubmitComment}
                isLoading={iscommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
        )}
        
      </Box>
    </Flex>
  );
};

export default PostFooter;
