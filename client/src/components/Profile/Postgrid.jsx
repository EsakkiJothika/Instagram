import {
  Avatar,
  Box,
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
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import p from "../../assets/images/profilepic.png";
import PostFooter from "../Feedpost/PostFooter";
import Comment from "./Comment";

const Postgrid = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                7
              </Text>
            </Flex>
            <Flex>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image src={img} w={"full"} h={"full"} objectFit={"cover"} />
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
            >
              {/* Image Section */}
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image
                  src={img}
                  alt="profile post"
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                />
              </Box>

              {/* Comments Section */}
              <Flex
                flexDir={"column"}
                flex={1}
                display={{ base: "none", md: "flex" }}
                px={10}
                maxH="100%"
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={p} size={"sm"} />
                    <Text fontWeight={"bold"} fontSize={12}>
                      asaprogrammer
                    </Text>
                  </Flex>
                  <Box
                    _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                    borderRadius={4}
                    p={1}
                  >
                    <MdDelete size={20} cursor={"pointer"} />
                  </Box>
                </Flex>

                <Divider bg={"gray.500"} my={5} />

                {/* Scrollable Comments */}
                <VStack
                  alignItems={"start"}
                  maxH={"350px"}
                  w={"full"}
                  flex={1} // Takes available space
                  overflowY={"auto"}
                 
                >
                  <Comment
                    createdAt="1 day ago"
                    username="asaprogrammer"
                    profilePic={p}
                    text="Life is beautiful when you care for nobody."
                  />
                  <Comment
                    createdAt="12h ago"
                    username="abrahmov"
                    profilePic="https://bit.ly/dan-abramov"
                    text="Nice pic"
                  />
                  <Comment
                    createdAt="3h ago"
                    username="kentdodds"
                    profilePic="https://bit.ly/kent-c-dodds"
                    text="Good clone dude!"
                  />

                  <Comment
                    createdAt="3h ago"
                    username="kentdodds"
                    profilePic="https://bit.ly/kent-c-dodds"
                    text="Good clone dude!"
                  />

                  <Comment
                    createdAt="3h ago"
                    username="kentdodds"
                    profilePic="https://bit.ly/kent-c-dodds"
                    text="Good clone dude!"
                  />
                  <Comment
                    createdAt="12h ago"
                    username="abrahmov"
                    profilePic="https://bit.ly/dan-abramov"
                    text="Nice pic"
                  />
                  <Comment
                    createdAt="12h ago"
                    username="abrahmov"
                    profilePic="https://bit.ly/dan-abramov"
                    text="Nice pic"
                  />
                  <Comment
                    createdAt="12h ago"
                    username="abrahmov"
                    profilePic="https://bit.ly/dan-abramov"
                    text="Nice pic"
                  />

                  <Comment
                    createdAt="3h ago"
                    username="kentdodds"
                    profilePic="https://bit.ly/kent-c-dodds"
                    text="Good clone dude!"
                  />

                  <Comment
                    createdAt="3h ago"
                    username="kentdodds"
                    profilePic="https://bit.ly/kent-c-dodds"
                    text="Good clone dude!"
                  />
                </VStack>

                <Divider bg={"gray.300"} my={4} />

                {/* Footer Sticks to Bottom */}
                <Box mt="auto" w="full">
                  <PostFooter isprofilepage={true} mbValue={0} />
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
