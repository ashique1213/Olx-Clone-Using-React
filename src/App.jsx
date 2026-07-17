import React, { useEffect } from 'react'
import Homepage from './Pages/Homepage/Homepage'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ProductPage from './Pages/ProductPage/ProductPage'
import SignUp from './Pages/SignUp/SignUp'
import LogIn from './Pages/LogIn/LogIn'
import AddProductPage from './Pages/AddProductPage/AddProductPage'
import ContextProvider from './context/ContextProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <ContextProvider>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/addproduct' element={<AddProductPage />} />
      </Routes>
    </ContextProvider>
  )
}

export default App
