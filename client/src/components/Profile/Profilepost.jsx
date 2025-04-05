import { Box, Flex, Grid, Skeleton, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Postgrid from './Postgrid';
import useGetUserPost from '../../hooks/useGetUserPost';

const Profilepost = () => {

  const {isloading,posts} = useGetUserPost();

  const noPostsFound = !isloading && posts.length === 0;

  if (noPostsFound) {
    return <NoPostsFound />
  }

  return (
    <Grid
      templateColumns={
        {sm:'repeat(1, 1fr)',
        md:'repeat(3, 1fr)'}
      }
      gap={1}
      columnGap={1}
    >

      {isloading && [0,1,2,3,4,5].map((index)=>(
        <VStack key={index} alignItems={'flex-start'} gap={4}>
          <Skeleton w={'full'} h={'300px'}>
              <Box>content wrapped</Box>
          </Skeleton>
        </VStack>
      ))}

      {!isloading && (
        <>
          {posts.map((post) => (
            <Postgrid post={post} key={post.id} />
          ))}
        </>
      )}
      
    </Grid>
  )
}

export default Profilepost;

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found🤔</Text>
		</Flex>
	);
};
