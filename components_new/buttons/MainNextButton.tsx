import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userOnboardingState } from '../../atoms';

interface Props  { 
    btnName: string;
    disabled?: boolean;
    className?: string;
    clickAction?: () => void | undefined;
}

function MainNextButton(props: Props) {
  
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);

  return (
    <div className='flex flex-col justify-center items-center '>
      <button 
        disabled={props.disabled} 
        onClick={props.clickAction ? props.clickAction : () => setUserOnboarding(userOnboardingStep + 1)} 
        className={`${props.disabled ? 'bg-[#e6e6e6] text-[#8e8e8f] cursor-not-allowed' : 'bg-[#1273ea] text-white'}
          mt-9  w-full px-24
          h-[68px] items-center rounded-full  font-bold text-lg ${props.className}`}
      >
        <div className='flex justify-center'>
            <p className='relative text-center '>{props.btnName}</p>
        </div>
      </button>
    </div>
  )
}

export default MainNextButton;