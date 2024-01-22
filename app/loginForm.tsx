"use client"
import React, { FormEvent, useState } from 'react'

import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const router=useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const logInHandler=(e:FormEvent)=>{
        e.preventDefault();

        // Validate username and password using regex
        if (username && password) {
            router.push('/dashboard');
        }else{
            alert("USername and password");
        }
      
    
    }
  return (
    <>
       <form onSubmit={logInHandler} action="" className=" bg-white w-[40%] rounded-xl  ">
   <div className=" my-4">
   <h1 className=" text-black text-center text-xl font-bold  ">Login</h1>
    
    <input onChange={(e)=>setUsername(e.target.value)} placeholder=" Username " type="text" className=" focus:border-orange-400 outline-none text-black rounded-md bg-slate-200 my-2 w-[80%] mx-auto block border " />
    <input onChange={(e)=>setPassword(e.target.value)}  placeholder=" Password" type="Password" className=" focus:border-orange-400 outline-none text-black   rounded-md bg-slate-200 my-2 w-[80%] mx-auto block  border " />
   <div className=" flex items-center justify-center my-6">
   <button className=" w-[20%]  bg-orange-400 text-white font-extrabold  rounded-lg   hover:opacity-80  py-2">
       Login
      </button>
   </div>
   </div>
  </form>
    </>
  )
}

export default LoginForm
