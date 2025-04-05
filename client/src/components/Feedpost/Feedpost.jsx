import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import useGetFeedPost from '../../hooks/useGetFeedPost';

const Feedpost = () => {
    const {isloading, posts} = useGetFeedPost();


  return (
    <div>
      <Container maxW={'container.lg'} py={10} px={2}>
        {/* Skeleton Loader */}
        {isloading &&
          [0, 1, 2, 3].map((index) => (
            <VStack key={index} gap={4} alignItems={'flex-start'} mb={10}>
              <Flex gap={4} alignItems="center">
                <SkeletonCircle size={10} />
                <VStack gap={2} alignItems={'flex-start'}>
                  <Skeleton height={'10px'} w={'200px'} />
                  <Skeleton height={'10px'} w={'150px'} />
                </VStack>
              </Flex>
              <Skeleton w={'full'} h={'400px'} />
            </VStack>
          ))}

        {/* Actual Posts */}
        {!isloading && posts.length > 0 && (
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        )}
        {!isloading && posts.length === 0 && (
				<>
					<Text fontSize={"md"} color={"red.400"}>
						OOPS!. Looks like you don&apos;t have any friends.
					</Text>
					<Text color={"red.400"}>Stop coding and go make some!! OR Check your Internet Connectivity</Text>
				</>
			)}

      </Container>
    </div>
  );
};

export default Feedpost;
