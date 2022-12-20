import React from 'react'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userOnboardingState } from '../../atoms';

interface nextButtonInterface {
  btnText?: string;
}

function UserNextButton(props: nextButtonInterface) {
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const userCurrentStep = useRecoilValue(userOnboardingState)
  return (
    <div  className=' flex space-x-2 items-center'>
        <p className='text-left text-sm font-medium flex'>{props.btnText ? props.btnText : "Next"}</p>
        <div onClick={() => setUserOnboarding(userOnboardingStep + 1)} className='cursor-pointer items-center justify-center flex flex-row  bg-black rounded-full w-9 h-9 p-2'>
            <ChevronRightIcon height={22} width={22} strokeWidth={3} color={'#fff'}/>
        </div>
    </div>
  )
}

export default UserNextButton