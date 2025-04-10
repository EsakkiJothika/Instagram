import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import Postheader from './Postheader'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../../hooks/useGetUserProfileById';



const Post = ({post}) => {

  const {userProfile} = useGetUserProfileById(post.createdBy);
  
  return (
    <>

        <Postheader post={post} creatorprofile={userProfile}  />

        <Box my={2} borderRadius={4} overflow={'hidden'}>
           <Image 
           src={post.imageURL}  
           alt='Feed Post IMG'
           width="100%"           // make it take full width of the container
           height="auto"          // maintain the original aspect ratio
           objectFit="cover"      // nicely crop if needed
            /> 
        </Box>

        <PostFooter post={post} creatorprofile={userProfile} mbValue={10} /> 
      
    </>
  )
}

export default Post
