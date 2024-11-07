import React, { useState } from "react"
import Navbar from'./Components/Navbar/Navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

function App() {
  
  const [sidebar,setSidebar] = useState(true);
  return (
    <div>
      <Navbar setSidebar = {setSidebar}></Navbar>
      <Routes>
        <Route path="/" element={<Home sidebar = {sidebar}></Home>}></Route>
        <Route path="/video/:catagoryId/:videoId" element={<Video></Video>}></Route>
      </Routes>

    </div>
  )
}

export default App
