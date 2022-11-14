import React from 'react'

interface Props  { 
    setCurrentStep: any,
    currentStep: number,
    btnName: string
    disabled?: boolean
}
//w-[386px] 
function NextButton({setCurrentStep, currentStep, btnName, disabled}: Props) {
  return (
    <div  className='items-center flex flex-col justify-center'>
      <button disabled={disabled} onClick={() => setCurrentStep(currentStep)} className={`
      
      ${disabled ? 'bg-[#e6e6e6] text-[#8e8e8f] cursor-not-allowed' : 'bg-[#1273ea] text-white'}
      
      mt-9  w-full px-24
        h-14 items-center rounded-full  font-bold text-lg`}>
          <div className='flex justify-center'>
            <p className='relative text-center '>{btnName}</p>
          </div>
      </button>
    </div>

  )
}

export default NextButton