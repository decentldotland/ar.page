import Link from 'next/link'
import React from 'react'
import CustomConnectButton from '../buttons/ConnectAccount'
import NextButton from '../buttons/NextButton'

interface Props { 
    setCurrentStep: any
  }

function SignUpPage({setCurrentStep}: Props) {
  return (
    <div className='items-center flex flex-row  justify-center'>
        <div className="items-center flex flex-col mt-[293px] h-full space-y-3">
          <h1 className='font-bold text-3xl text-center'>
            Sign Up for ArPage 
          </h1>
          <h2 className='text-sm text-[#8e8e8f] text-center font-medium'>
            Create a profile, follow other accounts, join DAO communities and more. 
          </h2>


        </div>
          <div className='absolute bottom-[114px]'>
            <NextButton btnName='Create new profile' setCurrentStep={setCurrentStep} currentStep={1} />
            <div className='space-y-2 mt-6 text-[#6a6b6a] font-medium text-center'>
              <h1 className="text-sm">Already have profile?</h1>
              <Link href={"/"} >
                <h1 className='underline cursor-pointer'>
                  Sign in
                </h1>
              </Link>
            </div>
          </div>
      </div>
  )
}

export default SignUpPage