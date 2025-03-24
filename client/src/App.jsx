import { useRef, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import PageLayout from './layout/PageLayout'
import Profilepage from './pages/Profilepage'





function App() {

 
 

  return (
    <div >

 
      

      <BrowserRouter>

    <PageLayout>

    <Routes>
        <Route path='/' element={<Homepage />}>Home</Route>
        <Route path='/login' element={<Loginpage />}>Login</Route>
        <Route path='/:username' element={<Profilepage />}>Profile</Route>
      </Routes>
      
    </PageLayout>   
      
      </BrowserRouter>

      

    </div>
  )
}

export default App
