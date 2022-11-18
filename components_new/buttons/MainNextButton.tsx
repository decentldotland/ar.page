import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userOnboardingState } from '../../atoms';

interface Props  { 
    btnName: string
    disabled?: boolean
}
//w-[386px] 
function MainNextButton({btnName, disabled}: Props) {
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);

  return (
    <div  className='items-center flex flex-col justify-center'>
      <button disabled={disabled} onClick={() => setUserOnboarding(userOnboardingStep + 1)} className={`
      
      ${disabled ? 'bg-[#e6e6e6] text-[#8e8e8f] cursor-not-allowed' : 'bg-[#1273ea] text-white'}
      
      mt-9  w-full px-24
      h-[68px] items-center rounded-full  font-bold text-lg`}>
          <div className='flex justify-center'>
            <p className='relative text-center '>{btnName}</p>
          </div>
      </button>
    </div>

  )
}

export default MainNextButton