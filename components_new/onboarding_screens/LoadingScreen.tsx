import { CircularProgress } from '@mui/material'
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { userOnboardingState } from '../../atoms';


interface Props { 
  msg: string
}

function LoadingScreen({msg}: Props) {
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);

    // after a timer, redirectr the user to the home page 
    const route = useRouter();
    const [time, setTimeOut] = useState(false)
    
    useEffect(() => {
      setTimeout(function () {
        setTimeOut(true); 
      }, 5000);
    }, []);


    useEffect(() => {
        if (time) setUserOnboarding(userOnboardingStep + 1)
    }, [time])
    

    
  
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