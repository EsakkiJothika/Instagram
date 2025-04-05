import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink, useParams } from 'react-router-dom'
import React from 'react'
import Profileheader from './Profileheader'
import Profiletabs from './Profiletabs'
import Profilepost from './Profilepost'
import useGetUserProfilebuUsername from '../../hooks/useGetUserProfilebuUsername'

const Profile = () => {

  const {username} = useParams();
  const { isloading,userProfile } = useGetUserProfilebuUsername(username);

  const userNotFound = !isloading && !userProfile;

  if (userNotFound) {
    return <UserNotFound />
  }
  return (

    <Container maxW={'container.lg'} py={5} >

        <Flex py={10}  px={{base:4,md:10}} w={'full'} direction={'column'} mx={'auto'} >

          {!isloading && userProfile && <Profileheader />}
          {isloading && <ProfileHeaderSkeleton />}
            
        </Flex>
        <Flex w={'full'}  px={{base:2,sm:4}} mx={'auto'} borderTop={'1px solid'} borderColor={'whiteAlpha.300'} direction={'column'}>
            <Profiletabs />
            <Profilepost />
        </Flex>

    </Container>
      
    
  )
}

export default Profile


// skeleton for profile header
const ProfileHeaderSkeleton = () => {
	return (
		<Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' />
				<Skeleton height='12px' width='100px' />
			</VStack>
		</Flex>
	);
};

const UserNotFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"}>
			<Text fontSize={"2xl"}>User Not Found</Text>
			<Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
				Go home
			</Link>
		</Flex>
	);
};
