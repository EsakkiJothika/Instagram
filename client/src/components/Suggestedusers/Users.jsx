import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Users = ({ name, followers, avatar }) => {

  const [isfollowed,setIsfollowed] = useState(false);

  const handlefollow = ()=>{

    setIsfollowed(!isfollowed)

  }

  return (

    <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'} gap={4}>
      {/* Left Section */}
      <Flex alignItems={'center'} gap={4} flex={1}>
        <Avatar src={avatar} size={'md'} name={name} />
        <VStack spacing={0} alignItems={'flex-start'}> 
          <Box fontSize={12} fontWeight={'bold'}>{name}</Box>
          <Box fontSize={11} color={'gray.500'}>{followers} followers</Box>
        </VStack>
      </Flex>

      {/* Right Section (Button) */}
      <Button 
        bg={'transparent'}
        border={"1px solid gray"}
        fontSize={14}
        fontWeight={'bold'}
        h={'30px'} 
        color={'blue.400'}
        flexShrink={0} // Prevents button from shrinking
        onClick={handlefollow}
      >
        {isfollowed ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  )
}

export default Users
