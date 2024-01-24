import React from 'react'
import LogoutButton from './logoutButton'
import PlayersDataShowing from './PlayersDataShowing'
import { GiBasketballBall } from 'react-icons/gi'

import SwitchDisplayBtn from './toggleButton'
const DashBoard = () => {
 
  // const { button1State, button2State } =
  // useBtnStore();
  return (
    <div className=' m-8 flex items-center justify-evenly overflow-hidden max-h-screen'>
       {/* left side */}
        
          
          <PlayersDataShowing/>
         
        {/* right side  */}
      <div className=' w-[40%]'>
      <div className=' flex-1 items-center   '> 
             <h1 className="m-3  mx-auto text-center rounded-lg shadow-md  bg-white  w-40  ">
             <GiBasketballBall className=" m-2 text-9xl text-black text-center" />
             </h1>
             <div>
              <h1 className=' text-center text-2xl text-black font-extrabold tracking-widest'>Basketball App</h1>
             </div>
             <div></div>
             <div className=' text-center'>
                <LogoutButton />
             </div>
             <SwitchDisplayBtn/>
        </div>
      </div>
   </div>

  )
}

export default DashBoard
