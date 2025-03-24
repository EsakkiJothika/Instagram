import {   Container, Flex, Img, VStack } from '@chakra-ui/react'
import {  Box, Image } from '@chakra-ui/react'
import React from 'react'
import e from "../assets/images/auth.png"
import f from "../assets/images/playstore.png"
import m from "../assets/images/microsoft.png"
import Logform from '../components/login/Logform'

const Loginpage = () => {
  return (
    <div>
        <Flex minH={"100vh"} justifyContent={'center'} alignItems={'center'} px={3}>
            <Container maxW={"container.lg"} padding={0} >

              <Flex alignItems={'center'} justifyContent={'center'} gap={10}>

                {/* Left hand side */}

              <Box display={{base:"none",md:"block"}}>
                <Image src={e} h={650} alt='phone'/>

              </Box>

              {/* Right hand side */}

              <VStack  align={'stretch'}>

                <Logform />

                <Box textAlign={"center"}>Get the app</Box>
                <Flex gap={5} justifyContent={'center'} my={1}>

                  <Img src={m} h={10} alt='microsoft logo'/>
                  <Img src={f} h={10} alt='playstore log'/>
                  
                </Flex>

              </VStack>

              </Flex>
              
              


            </Container>
        </Flex>
      
    </div>
  )
}

export default Loginpage
