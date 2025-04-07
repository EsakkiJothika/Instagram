import { Box, Button, Flex, Image, Img, Input, Text, VStack } from '@chakra-ui/react'
import  { React,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Style.css"
import Signform from './Signform'
import Login from './Login'
import Googlelog from './Googlelog'

const Logform = () => {

    const [isLogin,setIsLogin] = useState(true);
    

  return (
    <div>

        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <VStack spacing={3} w={300}>

                <h1 className='grand' >Instagram </h1>
                

                {isLogin ? <Login /> : <Signform /> }

        {/* --------------  OR TEXT --------------- */}

                <Flex alignItems={'center'} justifyContent={'center'}  mt={3} gap={1} w={'full'}>
                    <Box h={"1px"} bg={'gray'} flex={2}/>
                    <Text  mx={1}>OR</Text>
                    <Box h={"1px"} bg={'gray'} flex={2}/>
                </Flex>

        {/* -------------- Google signin ------------ */}

                <Googlelog  mode={isLogin ? "login" : "signup"} />

            </VStack>
        </Box>

        <Box  border={"1px solid gray"} borderRadius={5} padding={5} my={2}>
            <Flex alignContent={'center'} justifyContent={'center'} gap={2}>
                <Box >
                    {isLogin ? "Don't have an account?" : "Already having an account?"}
                </Box>
                <Box cursor={'pointer'} color={'blue.500'} fontSize={18} onClick={()=>{setIsLogin(!isLogin)}}>
                    {isLogin ? "Signup" : "Log In"}
                </Box>
            </Flex>
        </Box>
      
    </div>
  )
}

export default Logform
