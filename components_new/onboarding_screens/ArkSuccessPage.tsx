import React from 'react'
import MainNextButton from '../buttons/MainNextButton'
import NextButton from '../buttons/MainNextButton'



function ArkSuccessPage() {
  return (
    <div className='flex px-5 flex-col h-screen relative justify-center
       w-full sm:w-[440px] bottom-16  space-y-5 '>
        <h1 className="sm:text-5xl  text-4xl font-bold text-left">Your Near Wallet <br /> 
        has been added 
        your ArPage! 🥳
        </h1>
        <MainNextButton btnName='Register Name' />
    </div>
  )
}

export default ArkSuccessPage