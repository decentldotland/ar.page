import { CircularProgress } from '@mui/material'
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userOnboardingState } from '../../atoms';


interface Props { 
  msg: string
}

function LoadingScreen({msg}: Props) {
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const userCurrentStep = useRecoilValue(userOnboardingState);

    // after a timer, redirectr the user to the home page 
    const route = useRouter();
    const [time, setTimeOut] = useState(false)
    
    useEffect(() => {
      setTimeout(function () {
        setTimeOut(true); 
      }, 5000);
    }, []);


    // if time out and the user is in the last step 
    useEffect(() => {
        if (time && userCurrentStep !== 12) setUserOnboarding(userOnboardingStep + 1)
        route.push('/')
    }, [time, userCurrentStep])
    

    
  
  return (
    <div className='cursor-not-allowed items-center flex flex-col justify-center h-screen space-y-5'>
        <CircularProgress color="inherit" size={31}/>
        <h1 className='font-medium text-xl text-center text-[#3a3a3a]'>
           {msg}
        </h1>
    </div>
  )
}

export default LoadingScreen