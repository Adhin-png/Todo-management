import './bootstrap.min (3).css'
import {Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Add from './Components/Add'
import Edit from './Components/Edit'
import React from 'react';
import Detail from './Components/Detail'
import Calendar from './Components/Calendar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <>
   
    <Routes>
      <Route path="/home" element={<Home />} />

      <Route path="/add" element={<Add />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/" element={<Home/>}/>
    </Routes>
    <ToastContainer />
      
    </>
  )
}

export default App