import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props  { 
    currentStep?: number,
    msg?: string, 
    sub_message?: string,
    setCurrentStep: any,
}

export function BlueButtonNext({currentStep, msg, sub_message, setCurrentStep}: Props) {
    return (
      <div className='flex justify-center items-center px-10 '>
        <div className='absolute flex flex-col bottom-24 '>
          <p className="text-sm text-center mb-6 font-medium ">
            {sub_message}
          </p>
          <button className=" bg-[#1273ea] w-[368px] h-14 items-center rounded-lg text-white font-bold text-lg" 
            onClick={() => setCurrentStep(currentStep)}>
              <div className='flex justify-center items-center'>
                <p className='relative text-center '>{msg}</p>
                <ArrowLongRightIcon height={20} width={20} className="absolute right-2"/>
              </div>
          </button>
          
        </div>
      </div>
    )
}