import React from 'react'
import Navbar from './components/Navbar'
import "./index.css"
import SideNav from './components/SideNav'
import {Outlet} from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar/>

      
      <SideNav/>
      <Outlet/>
     


    </div>
  )
}



export default App
