import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import useAuthstore from '../../store/authstore';
import useUserProfileStore from '../../store/userprofilestore';
import Editprofile from './Editprofile';
import useFollowUser from '../../hooks/useFollowUser';

const Profileheader = () => {

  const {userProfile} = useUserProfileStore();
  const authUser = useAuthstore((state) => state.user);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {isupdating,isfollowing, handleFollowUser} = useFollowUser(userProfile?.uid);

  const visitingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;


  return (
    <Flex gap={{base:4,md:10}} py={7} direction={{base:'column',sm:'row'}}>
      <Avatar 
  size={{ base: 'xl', md: '2xl' }}
  src={userProfile.profilepicURL}
  alt="profile logo"
  mx="auto"
/>

      <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
        <Flex 
        direction={{base:'column',md:'row'}} 
        gap={4} 
        justifyContent={{base:'center',md:'flex-start'}} 
        alignItems={'center'} 
        w={'full'}
        >

          <Text fontSize={'lg'} fontWeight={'bold'}> {userProfile.username} </Text>

          {visitingOwnProfileAndAuth && (
            <Flex alignItems={'center'} justifyContent={'center'}>
                <Button border={'1px solid whiteAlpha.300'} bg={'blue'} size={{base:'xs',md:'sm'}} onClick={onOpen} >Edit Profile</Button>
            </Flex>
          )}
          
          {visitingAnotherProfileAndAuth && (
            <Flex alignItems={'center'} justifyContent={'center'}>
                <Button border={'1px solid whiteAlpha.300'} bg={'blue'} size={{base:'xs',md:'sm'}} isLoading={isupdating} onClick={handleFollowUser}> {isfollowing ? "Unfollow" : "Follow"} </Button>
            </Flex>
          )}

        </Flex>
        <Flex gap={{base:2,sm:4}} alignItems={'center'}>
          <Text fontSize={{base:'xs',md:'sm'}}>
            <Text as={'span'} mr={1} fontWeight={'bold'}> {userProfile.posts.length} </Text>
            Posts
          </Text>
          <Text fontSize={{base:'xs',md:'sm'}}>
            <Text as={'span'} mr={1} fontWeight={'bold'}> {userProfile.followers.length} </Text>
            Followers
          </Text>
          <Text fontSize={{base:'xs',md:'sm'}}>
            <Text as={'span'} mr={1} fontWeight={'bold'}> {userProfile.following.length} </Text>
            Following
          </Text>
        </Flex>

        <Flex alignItems={'center'} gap={4}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {userProfile.fullname}
          </Text>
        </Flex>
        <Text> {userProfile.bio} </Text>

      </VStack>

      {isOpen && <Editprofile isOpen={isOpen} onClose={onClose} /> }
    </Flex>
  )
}

export default Profileheader
