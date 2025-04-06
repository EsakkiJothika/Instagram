import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import { timeAgo } from '../../utils/timeAgo'

const Comment = ({comment}) => {

  const {isloading,userProfile} = useGetUserProfileById(comment.createdBy);

  if (isloading) {
    return <CommentSkeleton />
  }


  return (
    <Flex gap={4} color={'white'} >
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilepicURL}  size={'sm'} />
      </Link>
        
        <Flex direction={'column'} >
            <Flex gap={2} >
            <Link to={`/${userProfile.username}`}>
                <Text fontSize={12} fontWeight={'bold'}>
                  {userProfile.username}
                </Text>
            </Link>
                <Text fontSize={14}> {comment.comment} </Text>
            </Flex>
            <Text fontSize={12} color={'gray'}>
              {timeAgo(comment.createdAt)}
            </Text>
        </Flex>
    </Flex>
  )
}

export default Comment


const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' />
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} />
				<Skeleton height={2} width={50} />
			</Flex>
		</Flex>
	);
};
