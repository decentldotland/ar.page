import { ArrowLongRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import BackButton from '../reservation/BackButton'


interface Props { 
    setCurrentStep: any,
    currentStep: number
}
function AvatarSelectionPage({
    setCurrentStep, 
    currentStep
}: Props) {
  return (
    <section className="mt-10">
        <div>
            <BackButton setstep={setCurrentStep} step={currentStep - 1}/>
            <h1 className="text-[32px] font-bold mt-5">Now the fun part, 
                <br/> choose your avatar!
            </h1>
            <p className="text-sm self-start mb-6 text-[#8e8e8f]">
                Choose the avatar that best represents  <br/>your social profile!</p>
        </div>
        <div className='flex flex-row justify-center mt-10'>
            <div className='cursor-pointer rounded-full w-[217px] h-[217px] bg-[#edecec] items-center flex flex-row justify-center'>
                <PlusIcon height={24} width={24} color={"#6a6b6a"} />
            </div>
        </div>
        <h1 className='text-center mt-10 text-sm text-[#8e8e8f] cursor-pointer'>or choose from...</h1>

        <div className='mt-14 flex flex-col space-y-7'>
            <button className=" bg-[#1273ea] w-full h-14 items-center cursor-pointer relative rounded-lg text-white font-bold text-lg" >
                <div className='flex justify-center items-center'>
                  <p className='relative text-center '>Browse your NFT Collections</p>
                  <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                </div>
            </button>
            <button className=" bg-[#1273ea] w-full h-14 cursor-pointer items-center relative rounded-lg text-white font-bold text-lg" >
                <div className='flex justify-center items-center'>
                  <p className='relative text-center '>Decent Land Avatar Collection</p>
                  <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/>
                </div>
            </button>
        </div>
        <h1 className='text-center mt-10 text-sm text-[#8e8e8f] cursor-pointer'>Maybe Later</h1>
    </section>
  )
}

export default AvatarSelectionPage