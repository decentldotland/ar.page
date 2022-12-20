import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface Props  { 
  step?: number,
    msg?: string, 
    sub_message?: string,
    setstep: any,
}

export function BlueButtonNext({step, msg, sub_message, setstep}: Props) {
    return (
      <div className='flex justify-center items-center px-10 '>
        <div className='absolute flex flex-col bottom-10 sm:bottom-24 '>
          <p className="text-sm text-center mb-6 font-medium ">
            {sub_message}
          </p>
          <button className=" bg-[#1273ea] w-[368px] h-14 items-center rounded-lg text-white font-bold text-lg" 
            onClick={() => setstep(step)}>
              <div className='flex justify-center items-center'>
                <p className='relative text-center '>{msg}</p>
                <ArrowLongRightIcon height={20} width={20} className="absolute right-2"/>
              </div>
          </button>
          
        </div>
      </div>
    )
}