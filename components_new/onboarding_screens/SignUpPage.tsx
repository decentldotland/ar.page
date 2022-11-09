import Link from 'next/link'
import React from 'react'
import CustomConnectButton from '../buttons/ConnectAccount'

interface Props { 
    setCurrentStep: any
  }

function SignUpPage({setCurrentStep}: Props) {
  return (
    <div className='items-center flex flex-row  justify-center'>
        <div className="items-center flex flex-col justify-center h-screen space-y-3">
          <h1 className='font-bold text-4xl text-center'>
            Sign Up for ArPage 
          </h1>
          <h2 className='text-sm text-[#8e8e8f] text-center '>
            Create a profile, follow other accounts, join DAO communities and more. 
          </h2>
          <div  className='items-center flex flex-col justify-center'>
          
          <button onClick={() => setCurrentStep(1)} className=" mt-9 bg-[#1273ea] w-[276px] h-14 items-center rounded-full text-white font-bold text-lg" >
                <div className='flex justify-center'>
                  <p className='relative text-center '>Create New Profile</p>
                </div>
            </button>
          </div>

          <Link href={"/"} >
            <h1 className='cursor-pointer text-base text-[#8e8e8f] text-center font-medium'>
              Back to Home Page
            </h1>
          </Link>
        </div>
      </div>
  )
}

export default SignUpPage