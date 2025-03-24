import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Postgrid from './Postgrid';
import a from '../../assets/images/img1.png'
import b from '../../assets/images/img2.png'
import c from '../../assets/images/img3.png'
import d from '../../assets/images/img4.png'

const Profilepost = () => {

  const [isloading,setIsloading] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setIsloading(false)
    },2000)
  },[])

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
          <Postgrid img={a} />
          <Postgrid img={b} />
          <Postgrid img={c} />
          <Postgrid img={d} />
        </>
      )}
      
    </Grid>
  )
}

export default Profilepost
