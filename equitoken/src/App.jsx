import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Buy from './components/Buy';


function App() {


  return (
    <>
    <Navbar/>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/buy" element = {<Buy/>}/>
    </Routes>
    </>
  )
}

export default App
