import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import p from "../../assets/images/profilepic.png";
import PostFooter from "../Feedpost/PostFooter";
import Comment from "./Comment";
import useUserProfileStore from "../../store/userprofilestore";
import useAuthstore from "../../store/authstore";
import useShowToast from "../../hooks/useShowToast";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase";
import usePostStore from "../../store/poststore";
import axios from "axios";
import Caption from "./Caption";

const Postgrid = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthstore((state) => state.user);
  const deletePost = usePostStore((state) => state.deleteposts);
  const decrementPostsCount = useUserProfileStore((state) => state.deletePost);

  const showToast = useShowToast();
  const [isdeleted, setIsdeleted] = useState(false);

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure want to delete this post ?")) {
      return;
    }

    if (isdeleted) {
      return;
    }

    try {
      // imageRef = ref(Storage, `post/${post.id}`)
      // await deleteobject(imageRef)

      // Delete image from Cloudinary
      //  const cloudinaryPublicId = post.imageURL.split("/").pop().split(".")[0]; // Extract public ID
      //  await axios.post("https://api.cloudinary.com/v1_1/dazba41e6/destroy", {
      //    public_id: cloudinaryPublicId,
      //  });

      // Delete post from Firestore

      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePost(post.id);
      decrementPostsCount(post.id);

      showToast("Success", "Post deleted Successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsdeleted(false);
    }
  };

  return (
    <>
      <GridItem
        cursor={"pointer"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        borderRadius={4}
        overflow={"hidden"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          justifyContent={"center"}
          zIndex={1}
          position={"absolute"}
          top={0}
          bottom={0}
          left={0}
          right={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comment.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image src={post.imageURL} w={"full"} h={"full"} objectFit={"cover"} />
      </GridItem>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "4xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            pb={{ base: 7, md: 5 }}
            pt={{ base: 10, md: 5 }}
            bg={"black"}
            display="flex"
            flexDirection="column"
          >
            <Flex
              gap={4}
              w={{ base: "100%", sm: "70%", md: "full" }}
              mx={"auto"}
              h={"100%"}
              flex={1}
              // maxH={'90vh'}
              // minH={'50vh'}
            >
              {/* Image Section */}
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={post.imageURL}
                  alt="profile post"
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                />
              </Flex>

              {/* Comments Section */}
              <Flex
                flexDir={"column"}
                flex={1}
                display={{ base: "none", md: "flex" }}
                px={10}
                minH="0"
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={userProfile.profilepicURL} size={"sm"} />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>

                  {authUser?.uid === userProfile.uid && (
                    <Button
                      size={"sm"}
                      bg={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      p={1}
                      isLoading={isdeleted}
                      onClick={handleDeletePost}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>

                <Divider bg={"gray.500"} my={5} />

                {/* Scrollable Comments */}
                <VStack
                  alignItems={"start"}
                  w={"full"}
                  flex={1}
                  overflowY={"auto"} // ✅ Enables scrolling without affecting layout
                >
                  {/* CAPTION SECTION */}
                  {post.caption && (
                    <Caption post={post} />
                  )}

                  {/* COMMENT SECTION */}
                  {post.comment?.map(
                    (
                      comment // Fix: No extra space in `?.`
                    ) => (
                      <Comment key={comment.id} comment={comment} />
                    )
                  )}
                </VStack>

                <Divider bg={"gray.300"} my={4} />

                {/* Footer Sticks to Bottom */}
                <Box mt="auto" w="full">
                  <PostFooter isprofilepage={true} post={post} mbValue={0} />
                </Box>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Postgrid;
