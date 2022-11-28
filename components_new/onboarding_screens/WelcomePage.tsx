import React from 'react'
import MainNextButton from '../buttons/MainNextButton'

function WelcomePage() {
  return (
    <div className='relative h-screen justify-center flex flex-col w-full sm:w-[440px] px-5'>
        <div className="relative bottom-16">
            <div className='font-bold text-3xl text-center mb-[52px]'>Welcome to Decent land</div>
            <MainNextButton btnName='Continue'/>
        </div>
    </div>
  )
}

export default WelcomePage