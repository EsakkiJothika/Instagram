import React, { useRef, useState } from 'react'
import {
	Avatar,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
} from "@chakra-ui/react";
import useAuthstore from '../../store/authstore';
import usePreviewImg from '../../hooks/usePreviewImg';
import useEditprofile from '../../hooks/useEditprofile';
import useShowToast from '../../hooks/useShowToast';

const Editprofile = ({ isOpen, onClose }) => {

    const [fullname,setFullname] = useState("");
    const [username,setUsername] = useState("");
    const [bio,setBio] = useState("");
    const fileRef = useRef(null);

    const { selectedfile, handleImageChange, setSelectedfile } = usePreviewImg();
    const { editprofile, isupdating } = useEditprofile();
    const showToast = useShowToast();

    const authUser = useAuthstore((state) => state.user);

    const editeddata = {
        fullname : fullname,
        username : username,
        bio : bio
    }

    const handleEditprofile = async ()=>{
        try {

            await editprofile(editeddata,selectedfile)
            setSelectedfile(null)
            onClose()

        } catch (error) {

            showToast("Error", error.message, "error")
        }
        
    }

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
					<ModalHeader />
					<ModalCloseButton />
					<ModalBody>
						{/* Container Flex */}
						<Flex bg={"black"}>
							<Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
     							<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
									Edit Profile
								</Heading>
								<FormControl>
									<Stack direction={["column", "row"]} spacing={6}>
										<Center>
											<Avatar size='xl' src={selectedfile || authUser.profilepicURL} border={"2px solid white "} />
										</Center>
										<Center w='full'>
											<Button w='full' onClick={()=>{fileRef.current.click()}}>Edit Profile Picture</Button>
										</Center>
                                        <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
									</Stack>
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Full Name</FormLabel>
									<Input placeholder={"Full Name"} size={"sm"} type={"text"} onChange={(e)=>{setFullname(e.target.value)}} value={fullname || authUser.fullname} />
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Username</FormLabel>
									<Input placeholder={"Username"} size={"sm"} type={"text"} onChange={(e)=>{setUsername(e.target.value)}} value={username || authUser.username} />
								</FormControl>

								<FormControl>
									<FormLabel fontSize={"sm"}>Bio</FormLabel>
									<Input placeholder={"Bio"} size={"sm"} type={"text"} onChange={(e)=>{setBio(e.target.value)}} value={bio || authUser.bio} />
								</FormControl>

								<Stack spacing={6} direction={["column", "row"]}>
									<Button
										bg={"red.400"}
										color={"white"}
										w='full'
										size='sm'
										_hover={{ bg: "red.500" }}
                                        onClick={onClose}
									>
										Cancel
									</Button>
									<Button
										bg={"blue.400"}
										color={"white"}
										size='sm'
										w='full'
										_hover={{ bg: "blue.500" }}
                                        onClick={handleEditprofile}
                                        isLoading={isupdating}
									>
										Submit
									</Button>
								</Stack>
							</Stack>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Editprofile;
