import Link from 'next/link'
import React from 'react'
import CustomConnectButton from '../buttons/ConnectAccount'
import NextButton from '../buttons/NextButton'

interface Props { 
    setCurrentStep: any
  }

function SignUpPage({setCurrentStep}: Props) {
  return (
    <div className='items-center flex flex-col mt-[216px] w-full'>
        <div className="items-center flex flex-col  h-full space-y-7 w-[337px]">
          <h1 className='font-bold text-4xl text-center'>
            Create an account <br /> for ArPage
          </h1>
          <h2 className='text-sm text-[#8e8e8f] text-center font-normal'>
            Create a shareable handle, follow other accounts, <br /> connect to DAO communities using ArPage.
          </h2>
        </div>
          <div className='mt-[86px] '>
            <NextButton btnName='Create new profile' setCurrentStep={setCurrentStep} currentStep={1} />
            <div className='space-y-2 mt-6 text-[#6a6b6a] font-medium text-center flex flex-row space-x-1 items-end justify-center'>
              <h1 className="text-sm">Already have profile?</h1>
              <a href={"/"} >
                <h1 className='underline  font-bold cursor-pointer text-[#6a6b6a]'>
                  Sign in
                </h1>
              </a>
            </div>
          </div>
      </div>
  )
}

export default SignUpPage