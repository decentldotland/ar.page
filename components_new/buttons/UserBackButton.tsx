import React from 'react'
import {ChevronLeftIcon} from '@heroicons/react/24/outline'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userOnboardingState } from '../../atoms';

interface Props { 
  overrideStep?: number | null

}

function UserBackButton({overrideStep}: Props) {
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const userCurrentStep = useRecoilValue(userOnboardingState)

  const nextStep = () => { 
    if (!overrideStep) {
      setUserOnboarding(userOnboardingStep - 1)
    } else { 
      setUserOnboarding(overrideStep)
    }
  }

  return (
    <div  className=' flex space-x-2 items-center'>
        <div onClick={nextStep} className='cursor-pointer items-center justify-center flex flex-row  bg-black rounded-full w-9 h-9 p-2'>
            <ChevronLeftIcon height={22} width={22} strokeWidth={3} color={'#fff'}/>
        </div>
        <p className='text-left text-sm font-medium flex'>Go Back</p>
    </div>
  )
}

export default UserBackButton