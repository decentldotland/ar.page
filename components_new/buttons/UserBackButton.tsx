import React from 'react'
import {ChevronLeftIcon} from '@heroicons/react/24/outline'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userOnboardingState } from '../../atoms';



function UserBackButton() {
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const userCurrentStep = useRecoilValue(userOnboardingState)

  return (
    <div  className=' flex space-x-2 items-center'>
        <div onClick={() => setUserOnboarding(userOnboardingStep - 1)} className='cursor-pointer items-center justify-center flex flex-row  bg-black rounded-full w-9 h-9 p-2'>
            <ChevronLeftIcon height={22} width={22} strokeWidth={3} color={'#fff'}/>
        </div>
        <p className='text-left text-sm font-medium flex'>Go Back</p>
    </div>
  )
}

export default UserBackButton