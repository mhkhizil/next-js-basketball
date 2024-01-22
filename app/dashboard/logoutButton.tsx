"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const LogoutButton = () => {
    const router=useRouter();
  return (
    <div>
      <button onClick={()=>  router.push('/')} className=" w-[20%]  bg-orange-400 text-white font-extrabold  rounded-lg   hover:opacity-80  py-2">
       Log out
      </button>
    </div>
  )
}

export default LogoutButton
