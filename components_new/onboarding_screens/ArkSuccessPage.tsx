import React from 'react'
import NextButton from '../buttons/NextButton'
interface Props { 
    setCurrentStep: any,
    currentStep: number
  }
function ArkSuccessPage({setCurrentStep, currentStep}: Props) {
  return (
    <div className='flex px-5 flex-col h-screen relative justify-center
       w-full sm:w-[440px] bottom-16  space-y-5 '>
        <h1 className="sm:text-5xl  text-4xl font-bold text-left">Your Near Wallet <br /> 
        has been added 
        your ArPage! 🥳
        </h1>
        <NextButton btnName='Register Name' setCurrentStep={setCurrentStep} currentStep={5} />
    </div>
  )
}

export default ArkSuccessPage