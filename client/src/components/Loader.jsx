import { Box, Spinner, useColorMode } from '@chakra-ui/react';
import React from 'react'

const Loader = () => {
 
   
  const { colorMode } = useColorMode(); // Get current theme (light/dark)

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg={colorMode === "dark" ? "black" : "white"} // Dynamic background
    >
      <Spinner 
        size="xl" 
        color={colorMode === "dark" ? "#E1306C" : "#F56040"} // Instagram-like colors
        thickness="4px" 
      />
    </Box>
  );





}

export default Loader
