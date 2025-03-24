import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import a from '../../assets/images/img1.png';
import b from '../../assets/images/img2.png';
import c from '../../assets/images/img3.png';
import d from '../../assets/images/img4.png';

const Feedpost = () => {
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  }, []);

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
              <Skeleton w={'full'} h={'500px'} />
            </VStack>
          ))}

        {/* Actual Posts */}
        {!isloading && (
          <>
            <Post username="Joshua" img={a} avatar={a} />
            <Post username="Rohan" img={b} avatar={b} />
            <Post username="Lunaa" img={c} avatar={c} />
            <Post username="Isabella" img={d} avatar={d} />
          </>
        )}
      </Container>
    </div>
  );
};

export default Feedpost;
