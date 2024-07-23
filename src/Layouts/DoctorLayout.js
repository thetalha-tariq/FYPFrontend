import React from 'react'
import  DoctorNavbar  from '../Components/DoctorNavbar'
import  Footer  from '../Components/Footer'

export const DoctorLayout = ({children}) => {
  return (
    <div>
      <div><DoctorNavbar/> </div>
      <div>{children}</div>
      <div><Footer/></div>
    </div>
  )
}