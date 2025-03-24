import { Avatar, Box, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import a from '../../assets/images/profilepic.png'

const Suggestedheader = () => {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} gap={2}>
      {/* Left Section */}
      <Flex gap={2} alignItems={'center'} flex={1} maxW="250px">
        <Avatar size={'lg'} src={a} />
        <Box fontWeight={'bold'} fontSize={15} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          asaprogrammer
        </Box>
      </Flex>

      {/* Right Section (Log Out Link) */}
      <Link 
        as={RouterLink} 
        to={"/login"}
        fontWeight={'medium'}
        fontSize={14}
        color={'blue.400'}
        cursor={'pointer'}
        style={{ textDecoration: "none" }}
        whiteSpace="nowrap"
      >
        Log Out
      </Link>
    </Flex>
  )
}

export default Suggestedheader
