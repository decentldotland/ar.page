import React from 'react'
import {ChevronLeftIcon} from '@heroicons/react/24/outline'


interface Props { 
    setstep: any,
    step: number
} 

function BackButton({setstep, step}: Props) {
  return (
    <div  className=' flex space-x-2 items-center'>
        <div onClick={() => setstep(step)} className='cursor-pointer items-center justify-center flex flex-row  bg-black rounded-full w-9 h-9 p-2'>
            <ChevronLeftIcon height={22} width={22} strokeWidth={3} color={'#fff'}/>
        </div>
        <p className='text-left text-sm font-medium flex'>Go Back</p>
    </div>
  )
}

export default BackButton