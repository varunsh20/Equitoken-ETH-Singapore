import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Analyze from './components/Analyze';
import Swap from './components/Swap';
import Buy from './components/Buy';


function App() {


  return (
    <>
    <Navbar/>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/buy" element = {<Buy/>}/>
      <Route path = "/swap" element = {<Swap/>}/>
      <Route path = "/analyze" element = {<Analyze/>}/>
    </Routes>
    </>
  )
}

export default App
