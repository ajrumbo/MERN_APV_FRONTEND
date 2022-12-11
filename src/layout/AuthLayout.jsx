import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
        <div className='container mx-auto md:grid md:grid-cols-2 mt-12 p-5 gap-12 items-center'>
            <Outlet/>
        </div>
        
        
    </>
  )
}

export default AuthLayout