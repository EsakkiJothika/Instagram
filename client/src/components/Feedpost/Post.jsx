import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import Postheader from './Postheader'
import PostFooter from './PostFooter'




const Post = ({username,img,avatar}) => {
  return (
    <div>
        <Postheader username={username} img={img} avatar={avatar} />

        <Box my={2} borderRadius={4} overflow={'hidden'}>
           <Image src={img}  alt={username}/> 
        </Box>

        <PostFooter username={username} mbValue={10} /> 
      
    </div>
  )
}

export default Post
