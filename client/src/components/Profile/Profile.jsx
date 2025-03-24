import { Container, Flex } from '@chakra-ui/react'
import React from 'react'
import Profileheader from './Profileheader'
import Profiletabs from './Profiletabs'
import Profilepost from './Profilepost'

const Profile = () => {
  return (

    <Container maxW={'container.lg'} py={5} >

        <Flex py={10}  px={{base:4,md:10}} w={'full'} direction={'column'} mx={'auto'} >
            <Profileheader />
        </Flex>
        <Flex w={'full'}  px={{base:2,sm:4}} mx={'auto'} borderTop={'1px solid'} borderColor={'whiteAlpha.300'} direction={'column'}>
            <Profiletabs />
            <Profilepost />
        </Flex>

    </Container>
      
    
  )
}

export default Profile
