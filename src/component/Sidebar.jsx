import React from 'react'
import { FaCalendarAlt, FaCamera, FaCog, FaUser } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <aside className="w-14 h-[calc(100vh-1.4rem)] bg-black text-white rounded-tr-xl rounded-br-xl shadow-[0_0_10px_2px_rgba(255,255,255,0.4)] flex flex-col items-center py-4 ">


      <div className="flex flex-col gap-6 mt-4">
        <FaCalendarAlt className="text-xl hover:text-purple-400" />
        <FaCamera className="text-xl hover:text-purple-400" />
        <FaUser className="text-xl hover:text-purple-400" />
        <FaCog className="text-xl hover:text-purple-400" />
      </div>
    </aside>

  )
}

export default Sidebar
