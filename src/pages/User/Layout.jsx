import React from 'react'
import { Outlet } from 'react-router-dom'
import {NavBar} from '../../components/Common/User/Navbar'
import { Footer } from '../../components/Common/User/Footer'
function Layout() {
  return (
    <>
      <div className='h-screen grid grid-rows-[5rem] '>
        <div> 
          <NavBar/> 
        </div>
        <div className='md:grid md:grid-cols-1'>
          
          <div className='invisible md:visible'>
            {/* <Sidebar/> */}
          </div>

          <div>

            <div className='h-full '>
             <Outlet/>
            </div>

          </div>
        </div>
        <div>
            <Footer/>
        </div>
      </div>
    </>
  )
}

export default Layout
