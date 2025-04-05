import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'
import useLogout from '../../hooks/useLogout'
import useAuthstore from '../../store/authstore'
import { Link } from 'react-router-dom'

const Suggestedheader = () => {
  const { handleLogout, isloggingOut } = useLogout();
  const authUser = useAuthstore((state) => state.user);

  // Show Skeleton (Loading Placeholder) If User Data Is Not Ready
  if (!authUser) {
    return (
      <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} gap={2}>
        {/* Left Section (Loading Placeholder) */}
        <Flex gap={2} alignItems={'center'} flex={1} maxW="250px">
          <SkeletonCircle size="10" />
          <Skeleton height="20px" width="120px" />
        </Flex>

        {/* Right Section (Loading Placeholder) */}
        <Skeleton height="20px" width="50px" />
      </Flex>
    );
  }

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} gap={2}>
      {/* Left Section */}
      <Flex gap={2} alignItems={'center'} flex={1} maxW="250px">
        <Link to={`${authUser.username}`}>
          <Avatar 
            size={'lg'} 
            src={authUser.profilepicURL} 
          />
        </Link>
        <Link to={`${authUser.username}`}>
        <Box fontWeight={'bold'} fontSize={15} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {authUser.username}
        </Box>
        </Link>
          
      </Flex>

      {/* Right Section (Log Out Link) */}
      <Button 
        size={'xs'}
        bg={'transparent'}
        _hover={{ bg: 'transparent' }}
        fontWeight={'medium'}
        fontSize={14}
        color={'blue.400'}
        cursor={'pointer'}
        onClick={handleLogout}
        isLoading={isloggingOut}
        whiteSpace="nowrap"
      >
        Log Out
      </Button>
    </Flex>
  )
}

export default Suggestedheader;
