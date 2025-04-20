import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = () => {
    return (
        // <div className="bg-gray-100 ">
        //     <div className="flex flex-col flex-1 h-full position-relative">
        //         <Header />
        //         <div className='flex'>
        //             <div className='position-absolute top-0 left-0 z-20'>
        //                 <Sidebar />
        //             </div>
        //             <main className="p-4">
        //                 <Outlet />
        //             </main>
        //         </div>
        //         <Footer />
        //     </div>
        // </div>

        <div className="bg-gray-100 min-h-screen relative">
            {/* Sidebar - overlapping and spaced from top and bottom */}
            <div className="absolute top-4 bottom-[4rem] left-0 z-20">
                <Sidebar />
            </div>

            {/* Main content area with full-width header */}
            <div className="flex flex-col min-h-screen">
                <Header />

                <div className="flex-1 px-4 pt-4 pl-[5rem]">
                    <Outlet />
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Layout
