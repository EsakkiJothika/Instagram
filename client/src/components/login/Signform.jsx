import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement, VStack } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import React, { useState } from "react";
import useSignupWithEmailandPassword from "../../hooks/useSignupWithEmailandPassword";

const Signform = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [showpassword,setShowpassword] = useState(false);

  const signdata = {
    username : username,
    email : email,
    password : password,
    fullname : fullname
  }

  const {loading,error,signup} = useSignupWithEmailandPassword();

  return (
    <VStack spacing={4} w={300}>
      <Input
        placeholder="Email"
        type="email"
        fontSize={16}
        _placeholder={{ color: "whiteAlpha.600" }}
        border={"1px solid gray"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        placeholder="Fullname"
        type="text"
        fontSize={16}
        _placeholder={{ color: "whiteAlpha.600" }}
        border={"1px solid gray"}
        value={fullname}
        onChange={(e) => {
          setFullname(e.target.value);
        }}
      />
      <Input
        placeholder="Username"
        type="text"
        fontSize={16}
        _placeholder={{ color: "whiteAlpha.600" }}
        border={"1px solid gray"}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
     
     <InputGroup>
     <Input
        placeholder="Password"
        type={showpassword ? "text" : "password"}
        fontSize={16}
        _placeholder={{ color: "whiteAlpha.600" }}
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


      <Button w={"full"} colorScheme={"blue"} fontSize={16} isLoading={loading} onClick={()=>{signup(signdata)}}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signform;
