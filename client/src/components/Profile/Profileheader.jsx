import { Avatar, AvatarGroup, Button, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import p from '../../assets/images/profilepic.png'

const Profileheader = () => {
  return (
    <Flex gap={{base:4,md:10}} py={7} direction={{base:'column',sm:'row'}}>
      <AvatarGroup size={{base:'xl',md:'2xl'}} justifyContent={'center'} alignSelf={'flex-start'} mx={'auto'}>

        <Avatar name='as a programmer' src={p} alt='profile logo' />

      </AvatarGroup>
      <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
        <Flex 
        direction={{base:'column',md:'row'}} 
        gap={4} 
        justifyContent={{base:'center',md:'flex-start'}} 
        alignItems={'center'} 
        w={'full'}
        >

          <Text fontSize={'lg'} fontWeight={'bold'}>asaprogrammer</Text>
          
          <Button border={'1px solid gray'} size={{base:'xs',md:'sm'}} >Edit Profile</Button>

        </Flex>
        <Flex gap={{base:2,sm:4}} alignItems={'center'}>
          <Text fontSize={{base:'xs',md:'sm'}}>
            <Text as={'span'} mr={1} fontWeight={'bold'}>4</Text>
            Posts
          </Text>
          <Text fontSize={{base:'xs',md:'sm'}}>
            <Text as={'span'} mr={1} fontWeight={'bold'}>148</Text>
            Followers
          </Text>
          <Text fontSize={{base:'xs',md:'sm'}}>
            <Text as={'span'} mr={1} fontWeight={'bold'}>186</Text>
            Following
          </Text>
        </Flex>

        <Flex alignItems={'center'} gap={4}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            John Victor
          </Text>
        </Flex>
        <Text>Success is the ability to go from one failure to another with no loss of enthusiasm</Text>

      </VStack>
    </Flex>
  )
}

export default Profileheader
