import React, { useRef, useState } from "react";
import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/icons/Constants";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthstore from "../../store/authstore";
import usePostStore from "../../store/poststore";
import useUserProfileStore from "../../store/userprofilestore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../Firebase/firebase";
import axios from 'axios';

const Createpost = () => {

  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [caption,setCaption] = useState("");
  const imageRef = useRef(null);
  const {selectedfile, handleImageChange, setSelectedfile} = usePreviewImg();
  const showToast = useShowToast();

  const {isloading,handleCreatePost} = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedfile,caption);
      onClose();
      setCaption("");
      setSelectedfile(null);
      
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }

  return (
    <>
    <Tooltip
      hasArrow
      label={"Create"}
      placement="right"
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Flex
        alignItems={"center"}
        gap={4}
        _hover={{ bg: "whiteAlpha.400" }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
        onClick={onOpen}
      >
        <CreatePostLogo />
        <Box display={{ base: "none", md: "block" }}>Create</Box>
      </Flex>
    </Tooltip>

<Modal isOpen={isOpen} onClose={onClose} size='xl'>
<ModalOverlay />

<ModalContent bg={"black"} border={"1px solid gray"}>
  <ModalHeader>Create Post</ModalHeader>
  <ModalCloseButton />
  <ModalBody pb={6}>
    <Textarea placeholder='Post caption...' value={caption} onChange={(e) => {setCaption(e.target.value)}} />

    <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

    <BsFillImageFill
      style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
      size={16}
      onClick={() => {imageRef.current.click()}}
    /> 

    {selectedfile && (
      <Flex mt={5} width={"full"} position={"relative"} justifyContent={"center"}>
        <Image src={selectedfile} alt="selected img" />
        <CloseButton bg={"black"}
        position={"absolute"}
        top={2}
        right={2}
        onClick={() => {setSelectedfile(null)}}
        />
      </Flex>
    )}
  </ModalBody>

  <ModalFooter>
    <Button mr={3} onClick={handlePostCreation} isLoading={isloading}>Post</Button>
  </ModalFooter>
</ModalContent>
</Modal>

</>
  );
};

export default Createpost;

function useCreatePost(){

  const showToast = useShowToast();
  const [isloading,setIsloading] = useState(false);
  const authUser = useAuthstore((state) => state.user);
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const createPost = usePostStore((state) => state.createposts);
  const addpost = useUserProfileStore((state) => state.addPost);
  const pathname = useLocation();

  const uploadPreset = "instagramCloneUploads";
  const cloudUploadURL = "https://api.cloudinary.com/v1_1/dazba41e6/image/upload"

  const handleCreatePost = async (selectedfile, caption) => {
    if (isloading) {
      return
    }
    
    if (!selectedfile) {
      throw new Error('Please select an image')
    }
    setIsloading(true);

    const newPost = {
      caption:caption,
      likes : [],
      comment : [],
      createdAt : Date.now(),
      createdBy : authUser.uid,
    }

    try {

       // Upload image to Cloudinary

       const formData = new FormData();
       formData.append("file",selectedfile);
       formData.append("upload_preset",uploadPreset);
       formData.append("cloud_name", "dazba41e6");
       formData.append("folder", "uploadedpost");

       const response = await axios.post(cloudUploadURL,formData);
       const imageUrl = response.data.secure_url; // Get the image URL from Cloudinary

         // Create the post
      const postDocRef = await addDoc(collection(firestore,"posts"),newPost);

      // Add post ID to the user's profile
      const userDocRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
    
      // Update post document with image URL
      await updateDoc(postDocRef, { imageURL:imageUrl });

      newPost.imageURL = imageUrl;

      if (userProfile.uid === authUser.uid) {
        createPost({...newPost,id: postDocRef.id});
      }
      

      if (pathname !== '/' && userProfile.uid === authUser.uid) {
        addpost({...newPost,id: postDocRef.id});
      }
      

			showToast("Success", "Post created Successfully", "success")
      
    } catch (error) {
      showToast("Error", error.message, "error")
    } finally{
      setIsloading(false);
    }
  }

  return {isloading,handleCreatePost}
}
