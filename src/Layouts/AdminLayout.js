import React from 'react'
import  NavBar  from '../Components/Navbar'
import  Footer  from '../Components/Footer'

export const AdminLayout = ({children}) => {
  return (
    <div>
      <div><NavBar/> </div>
      <div>{children}</div>
      <div><Footer/></div>
    </div>
  )
}