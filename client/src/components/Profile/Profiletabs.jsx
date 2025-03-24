import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BsGrid3X3 } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";

const Profiletabs = () => {
  return (
    <Flex w={'full'} justifyContent={'center'}  gap={{base:4,sm:10}} fontWeight={'bold'} textTransform={'uppercase'}>

        <Flex borderTop={'1px solid white'} gap={1} alignItems={'center'} cursor={'pointer'} p={3}>
          <Box fontSize={20}>
            <BsGrid3X3 />
          </Box>
          <Text fontSize={12} display={{base:'none',md:'block'}}>Posts</Text>
        </Flex>

        <Flex  gap={1} alignItems={'center'} cursor={'pointer'} p={3}>
          <Box fontSize={20}>
            <BsBookmark />
          </Box>
          <Text fontSize={12} display={{base:'none',md:'block'}}>Saved</Text>
        </Flex>

        <Flex  gap={1} alignItems={'center'} cursor={'pointer'} p={3}>
          <Box fontSize={20}>
            <BsSuitHeart fontWeight={'bold'} />
          </Box>
          <Text fontSize={12} display={{base:'none',md:'block'}}>Likes</Text>
        </Flex>

    </Flex>
  )
}

export default Profiletabs
