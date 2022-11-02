import React from 'react'
import CustomConnectButton from '../buttons/ConnectAccount'

interface Props { 
    setCurrentStep: any
  }

function SignUpPage({setCurrentStep}: Props) {
  return (
    <div className='font-inter px-10'>
        <div className="items-center flex flex-col justify-center h-screen space-y-4">
          <h1 className='font-bold text-4xl text-center'>
            Sign Up for ANS 
          </h1>
          <h2 className='text-sm text-[#8e8e8f] text-center '>
            Create a profile, follow other accounts, join DAO communities and more. 
          </h2>
          <CustomConnectButton setCurrentStep={setCurrentStep}/>
        </div>
      </div>
  )
}

export default SignUpPage