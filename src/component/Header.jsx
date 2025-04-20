import React from 'react'
import { FaBell, FaUserCircle, FaCheckCircle } from 'react-icons/fa';
import OthisisLogo from '../assets/logos/othisis-logo.png';


const Header = () => {
    return (
        <header className="w-full bg-black text-white " >
            <div className='w-[calc(100%-10rem)] flex items-center justify-between px-6 py-3 mx-auto'>
                <div className="text-lg font-semibold flex items-center gap-2">
                    <img src={OthisisLogo} alt='othisis-logo' />
                   <span>Othisis Medtech</span> 
                </div>

                <div className="flex items-center gap-6">
                    <FaBell className="text-xl" />
                    <FaUserCircle className="text-xl" />
                    <FaCheckCircle className="text-xl" />
                </div>

            </div>
        </header>
    )
}

export default Header
