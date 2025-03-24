import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'


const Postheader = ({username,avatar}) => {
  return (
    <div>
      <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} my={2}>

        <Flex alignItems={'center'} gap={2}>
          <Avatar src={avatar} size={'sm'}/>
          <Flex fontSize={12} fontWeight={'bold'} gap={2}>

            {username}
            <Box color={'gray.500'}>. 1w</Box>

          </Flex>
        </Flex>
        <Box cursor={'pointer'}>
          <Text fontSize={13} color={'blue.400'} _hover={{color:"gray"}} transition={"0.2s ease-in-out"}>Unfollow</Text>
        </Box>
        

      </Flex>
    </div>
  )
}

export default Postheader
