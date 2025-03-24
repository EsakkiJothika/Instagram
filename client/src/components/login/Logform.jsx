import { Box, Button, Flex, Image, Img, Input, Text, VStack } from '@chakra-ui/react'
import  { React,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Style.css"
import g from "../../assets/images/google.png"

const Logform = () => {

    const [isLogin,setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");

    let handlelog = ()=>{
        let logdata = {
            Email : email,
            Password : password
        }

        if(!email || !password){
            alert("Please fill out all the fields")
            return;
        }

        navigate("/");
        console.log(logdata);
        
    }

  return (
    <div>

        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <VStack spacing={3} w={300}>

                <h1 className='grand' >Instagram </h1>
                

                <Input placeholder='Email' type='email' fontSize={16} border={"1px solid gray"} onChange={(e)=>{setEmail(e.target.value)}}/>
                <Input placeholder='Password' type='password' fontSize={16} border={"1px solid gray"} onChange={(e)=>{setPassword(e.target.value)}}/>

                {!isLogin ? (<Input placeholder='Confirm Password' type='password' fontSize={16} border={"1px solid gray"} onChange={(e)=>{setConfirm(e.target.value)}}/>) : null}

                <Button w={'full'} colorScheme={'blue'} fontSize={16} onClick={handlelog}>
                    {isLogin ? "Log In" : "Signup"}
                </Button>

        {/* --------------  OR TEXT --------------- */}

                <Flex alignItems={'center'} justifyContent={'center'}  mt={3} gap={1} w={'full'}>
                    <Box h={"1px"} bg={'gray'} flex={2}/>
                    <Text  mx={1}>OR</Text>
                    <Box h={"1px"} bg={'gray'} flex={2}/>
                </Flex>

        {/* -------------- Google signin ------------ */}

                <Flex alignItems={'center'} justifyContent={'center'} my={1} cursor={'pointer'}>
                    <Image src={g} alt='google logo' w={5} />
                    <Text mx={2} color={'blue.500'}>Log in with google</Text>
                </Flex>

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
