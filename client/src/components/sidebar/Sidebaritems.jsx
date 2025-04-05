import React from 'react'
import Home from './Home'
import Notifications from './Notifications'
import Createpost from './Createpost'
import Profilelink from './Profilelink'
import Search from './Search'

const Sidebaritems = () => {
  return (
    <>
        <Home />
        <Search />
        <Notifications />
        <Createpost />
        <Profilelink />

    </>
  )
}

export default Sidebaritems
