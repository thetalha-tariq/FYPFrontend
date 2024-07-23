import React from 'react'
import  AdminNavbar  from '../Components/AdminNavbar'
import  Footer  from '../Components/Footer'

export const AdminLayout = ({children}) => {
  return (
    <div>
      <div><AdminNavbar/> </div>
      <div>{children}</div>
      <div><Footer/></div>
    </div>
  )
}