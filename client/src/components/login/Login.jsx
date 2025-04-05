import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword,setShowpassword] = useState(false);

  const logindata = {

    email: email,
    password : password

  }

  const {loading,error,login} = useLogin();

  return (
    <VStack spacing={4} w={"full"}>
      <Input
        placeholder="Email"
        type="email"
        fontSize={16}
        _placeholder={{ color: "whiteAlpha.600" }}  // 👈 Change placeholder color here
        border={"1px solid gray"}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <InputGroup>
     <Input
        placeholder="Password"
        type={showpassword ? "text" : "password"}
        fontSize={16}
        _placeholder={{ color: "whiteAlpha.600" }}  // 👈 Change placeholder color here
        border={"1px solid gray"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <InputRightElement h={"full"}>
      <Button variant={"ghost"} size={"sm"} onClick={()=>{setShowpassword(!showpassword)}}>
        {showpassword ? <ViewIcon /> : <ViewOffIcon /> }
      </Button>
      </InputRightElement>

     </InputGroup>

{error?.message && (
  <Alert status="error" fontSize={13} p={2} borderRadius={4}>
    <AlertIcon fontSize={12} />
    {error.message}
  </Alert>
)}


      <Button w={"full"} colorScheme={"blue"} fontSize={16} isLoading={loading} onClick={() => {login(logindata)}} >
        Log In
      </Button>
    </VStack>
  );
};

export default Login;
