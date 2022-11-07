import Link from 'next/link'
import React from 'react'
import CustomConnectButton from '../buttons/ConnectAccount'

interface Props { 
    setCurrentStep: any
  }

function SignUpPage({setCurrentStep}: Props) {
  return (
    <div className=''>
        <div className="items-center flex flex-col justify-center h-screen space-y-4">
          <h1 className='font-bold text-4xl text-center'>
            Sign Up for ANS 
          </h1>
          <h2 className='text-sm text-[#8e8e8f] text-center '>
            Create a profile, follow other accounts, join DAO communities and more. 
          </h2>
          <CustomConnectButton setCurrentStep={setCurrentStep}/>
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