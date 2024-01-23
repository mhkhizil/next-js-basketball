"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const LogoutButton = () => {
    const router=useRouter();
  return (
    <div>
      <button onClick={()=>  router.push('/')}   className=" w-[20%] text-black  bg-orange-400 hover:bg-white text-xl font-extrabold   rounded-xl shadow-xl b  px-3 py-2">
       Log out
      </button>
    </div>
  )
}

export default LogoutButton
