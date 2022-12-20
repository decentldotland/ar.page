import { CircularProgress } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import { SetterOrUpdater } from 'recoil';
import { setOnboardingStep, getOnboardingStepNumeric } from '../../src/utils/onboardingHelper';
import axios from 'axios';

interface Props { 
  msg: string, 
  end?: boolean,
  arAddress?: string | undefined,
  handleLabels?: Dispatch<any>,
  handleOnboarding: SetterOrUpdater<number>;
}

function LoadingScreen(props: Props) {

    const [fetched, setFetched] = useState(false);
    const [error, setError] = useState(false);

    const fetchDomains = async() => {
      try {
        const result = await axios(`api/domains/${props.arAddress}`);
        const payload = result.data;
        console.log("Payload from Cross-checking: ", payload);
        if(result.status === 200 && payload !== null && payload !== undefined) {
          setFetched(true);
          console.log("LoadingScreen payload: ", payload);
          //@ts-ignore Secured by first if stmnt
          props.handleLabels(payload);
        } else {
          console.log("Loading Screen: no payload found");
          setFetched(true);
        }
      } catch (e) {
        console.log("Loading Screen: Error attempting to fetch domains");
          setError(true);
      } 
    };  
    
    useEffect(() => {
      fetchDomains();
    }, []);

    // if time out and the user is in the last step 
    useEffect(() => {
      if (fetched) {
        console.log("Loading Screen: Fetched worked, proceeding to step 6");
        setOnboardingStep("6");
        props.handleOnboarding(getOnboardingStepNumeric());
      }
    }, [fetched]);
    

  return ( 
    <>
    {error ?
      (
        <div className='cursor-pointer items-center flex flex-col justify-center h-screen space-y-5'>
            <p className='font-medium text-xl text-center text-[#3a3a3a]'>
              There was an error checking your data.
            </p>
            <p onClick={() => setError(false)}>Click here to fetch again.</p>
        </div>
      )
      :
      (
        <div className='cursor-not-allowed items-center flex flex-col justify-center h-screen space-y-5'>
            <CircularProgress color="inherit" size={31}/>
            <p className='font-medium text-xl text-center text-[#3a3a3a]'>
              {props.msg}
            </p>
        </div>
      )}
    </>
  );
}

export default LoadingScreen