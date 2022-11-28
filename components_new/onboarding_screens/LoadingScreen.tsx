import { CircularProgress } from '@mui/material'
import { runInContext } from 'lodash';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { userOnboardingState } from '../../atoms';


interface Props { 
  msg: string, 

  end?: boolean
}

/**
 * @description The loading screen for the onboarding flow 
 * @param msg Message to show under the loading screen 
 * @param end: OPTIONAL. Set to {@link 'True'}   if its the end of the flow. If true, the user will be automatically redirected to the home page 
 * @returns React.Component  
 */
function LoadingScreen({msg, end}: Props) {
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
      if (time) { 
        if (end) {
          route.push('/')
        } else { 
          setUserOnboarding(userOnboardingStep + 1)
        }    
      }
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