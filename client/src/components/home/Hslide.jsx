import { Box, Container, Flex } from '@chakra-ui/react'
import React from 'react'
import Feedpost from '../Feedpost/Feedpost'
import Suggested from '../Suggestedusers/Suggested'

const Hslide = () => {
  return (
    <div>
      <Container maxW={'container.lg'} >
        <Flex gap={20}>
            <Box flex={3} py={10} >
                <Feedpost />
            </Box>
            <Box flex={2} maxW={"400px"}  display={{base:'none',md:"block"}} >
                <Suggested />
            </Box>
        </Flex>
      </Container>
    </div>
  )
}

export default Hslide
