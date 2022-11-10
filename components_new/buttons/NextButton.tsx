import React from 'react'

interface Props  { 
    setCurrentStep: any,
    currentStep: number,
    btnName: string
}

function NextButton({setCurrentStep, currentStep, btnName}: Props) {
  return (
    <div  className='items-center flex flex-col justify-center'>
            <button onClick={() => setCurrentStep(currentStep)} className=" mt-9 bg-[#1273ea] w-[386px] 
            h-14 items-center rounded-full text-white font-bold text-lg" >
                <div className='flex justify-center'>
                  <p className='relative text-center '>{btnName}</p>
                </div>
            </button>
          </div>

  )
}

export default NextButton