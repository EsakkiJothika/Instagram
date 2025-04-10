import React, { useRef } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { SearchLogo } from "../../assets/icons/Constants";
import useSearchUser from "../../hooks/useSearchUser";
import Users from "../Suggestedusers/Users";
import useAuthstore from "../../store/authstore";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isloading, getUserProfile, user, setUser } = useSearchUser();
  const searchRef = useRef(null);
  const authUser = useAuthstore((state) => state.user);

  const handleSearchUser = (e) => {
    e.preventDefault();
    const searchValue = searchRef.current.value.trim();
  
    if (!searchValue) {
      setUser(null); // Clear previous search result if search input is empty
      return;
    }
  
    getUserProfile(searchValue); // Only call if there is a search value
  };
  

  
  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement="right"
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <form onSubmit={handleSearchUser}>
  <FormControl>
    <FormLabel>Username</FormLabel>
    <Input placeholder={authUser?.username} ref={searchRef} />
  </FormControl>

  <Flex w={"full"} justifyContent={"flex-end"}>
    <Button type="submit" ml={"auto"} size={"sm"} my={4} isLoading={isloading}>
      Search
    </Button>
  </Flex>
</form>

{user && <Users user={user} setUser={setUser} />}


          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
