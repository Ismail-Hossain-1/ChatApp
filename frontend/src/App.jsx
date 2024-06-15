import { useState } from 'react'
import './App.css'

import Login from './pages/login/login'
import SignUp from './pages/signup/signup'
import Home from './pages/home/home'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast';
import { useAuthContext } from './context/authContext'
import axios from 'axios';

function App() {
  const {authUser} = useAuthContext();
  const token= localStorage.getItem('token');
axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <div className='p-4 h-screen flex item-center justify-center'>

      <Routes>
        <Route path='/' element={authUser ?<Home/>: <Navigate to='/login'/>}/>
        <Route path='/login' element={authUser ? <Navigate to='/'/>:<Login/>}/>
        <Route path='/signup' element={authUser ? <Navigate to='/'/>:<SignUp/>}/>


      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
