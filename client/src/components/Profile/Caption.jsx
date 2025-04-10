import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useUserProfileStore from '../../store/userprofilestore'
import { timeAgo } from '../../utils/timeAgo'

const Caption = ({post}) => {

    const userProfile = useUserProfileStore((state) => state.userProfile);

  return (
    <Flex gap={4} >
    <Link to={`/${userProfile.username}`}>
      <Avatar src={userProfile.profilepicURL}  size={'sm'} />
    </Link>
      
      <Flex direction={'column'} >
          <Flex gap={2} alignItems={'center'}>
          <Link to={`/${userProfile.username}`}>
              <Text fontSize={12} fontWeight={'bold'}>
                {userProfile.username}
              </Text>
          </Link>
              <Text fontSize={14}> {post.caption} </Text>
          </Flex>
          <Text fontSize={12} color={'gray'}>
            {timeAgo(post.createdAt)}
          </Text>
      </Flex>
  </Flex>
  )
}

export default Caption
