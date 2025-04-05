import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom";
import useFollowUser from '../../hooks/useFollowUser';
import { timeAgo } from '../../utils/timeAgo';


const Postheader = ({post,creatorprofile}) => {

  const {isupdating,isfollowing, handleFollowUser} = useFollowUser(post.createdBy);

  return (
    <div>
      <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} my={2}>

        <Flex alignItems={'center'} gap={2}>
          <Link to={`/${creatorprofile?.username}`}>
            <Avatar src={creatorprofile?.profilepicURL} size={'sm'}/>
          </Link>
          
          <Flex fontSize={12} fontWeight={'bold'} gap={2}>

           <Link to={`/${creatorprofile?.username}`} > {creatorprofile?.username} </Link>
            <Box color={'gray.500'}>. {timeAgo(post.createdAt)} </Box>

          </Flex>
        </Flex>
        <Box cursor={'pointer'}>
          <Button fontSize={12} fontWeight={'bold'} size={'xs'} bg={'transparent'} color={'blue.500'} _hover={{color:"gray"}} transition={"0.2s ease-in-out"} onClick={handleFollowUser} isLoading={isupdating}>
            {isfollowing ? 'Unfollow' : 'Follow'}
            </Button>
        </Box>
        

      </Flex>
    </div>
  )
}

export default Postheader
