import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Toaster } from 'react-hot-toast'



export const CustomerLayout = ({children}) => {
  return (
    <div>
      <div><Navbar/> </div>
      <Toaster position="top-center" reverseOrder={false} />
     <div>{children}</div>
      <div><Footer/></div>
    </div>
  )
}