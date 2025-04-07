import React from 'react'
import Suggestedheader from './Suggestedheader'
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import Users from './Users'
import useGetSuggestedUser from '../../hooks/useGetSuggestedUser'

const Suggested = () => {

  const { isloading, suggestedUser} = useGetSuggestedUser();

  // optional return loading skeleton

  if(isloading) return null

  return (
    <div>
        <VStack py={8} px={6} gap={4} >
            <Suggestedheader />

          {suggestedUser.length !== 0 && (
            <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} >

            <Text fontSize={12} color={'gray.400'} fontWeight={'bold'}>Suggested for you</Text>
            {/* <Text fontSize={12}  _hover={{color:"gray.500"}} fontWeight={'bold'}>See all</Text> */}

          </Flex>
          )}


            {suggestedUser.map((user) =>{
              return(
                <Users user={user} key={user.id} />
              )
          
            })}

            <Box alignItems={'center'} justifyContent={'center'} fontSize={12} color={'gray.500'} alignSelf={'start'}  mt={5}>
              &copy; 2025 Built by{" "}
              <Link href='https://www.linkedin.com/in/k-esakki-alias-jothika-37b94025a' fontSize={14} color={'blue.500'} target='_blank'>Jothika</Link>
            </Box>
        </VStack>
      
    </div>
  )
}

export default Suggested
