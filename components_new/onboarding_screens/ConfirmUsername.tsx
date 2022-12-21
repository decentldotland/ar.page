import { CircularProgress } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import Web3 from 'web3';
import { userOnboardingState } from '../../atoms';
import { Ans } from '../../src/types';
import { getOnboardingStepNumeric, setOnboardingStep } from '../../src/utils/onboardingHelper';
import { createLabelHandle } from '../../src/utils/onboardingHelper';

interface Props { 
    arLabel: string;
    arAddress: string | undefined;
}

function ConfirmUsername({
    arAddress,
    arLabel
}: Props) {
  console.log("ARLABEL: ", arLabel);
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const userCurrentStep = useRecoilValue(userOnboardingState)

    const [loadingWrite, setLoadingWrite] = useState(false)
    const web3 = new Web3(Web3.givenProvider);
    const [invalidEVM, setInvalidEVM] = useState('')
    const [invalidLabel, setInvalidLabel] = useState('');
    const [changeUsername, setChangeUsername] = useState(false);
    //@ts-ignore
    const randomLabelHandle = createLabelHandle(arAddress ? arAddress : ".....");

    const onSubmit = (e: any) => {
        setOnboardingStep("8");
        setUserOnboarding(getOnboardingStepNumeric());
      }
     

    return (
        <section
          className={loadingWrite ? 'absolute h-screen bottom-0 w-screen z-50 bg-[#B3B2B3]/25 cursor-not-allowed  ' : 
            'relative h-screen flex flex-col items-center sm:w-[440px] w-full px-5 justify-between md:relative md:top-32'}>         
          <div className='flex flex-col items-center mt-40  w-full sm:w-[440px] '>
            <p className='text-xl text-center font-medium mb-7 text-[#3a3a3a]'>Your username</p>
            <p className='font-bold text-xl lg:text-4xl mb-4'>
              @{arLabel ?
                 arLabel 
                :
                  //@ts-ignore
                  randomLabelHandle
                }
            </p>
            {/* Go back to registration page  */}
            <p 
              onClick={arLabel ?
                () => {
                  setOnboardingStep(String(getOnboardingStepNumeric() - 1));
                  setUserOnboarding(getOnboardingStepNumeric());
                }
                :
                () => {
                  setChangeUsername(prev => !prev);
                }
              } 
              className='cursor-pointer font-medium text-sm text-[#1273ea] text-left hover:underline'>
                Change username
            </p>
          </div>
          {/* Button to register name and direct the user to the next screen */}
          <div className='w-full items-center flex flex-col justify-center  relative bottom-28'>
            <button onClick={(e) => onSubmit(e)} disabled={invalidEVM.length > 0 || invalidLabel.length > 0} 
              className=" bg-[#1273ea] w-full px-24 h-[68px] items-center rounded-full text-white font-bold text-lg" >
                <div className='flex justify-center items-center'>
                  {
                    loadingWrite ? (
                      <CircularProgress color="inherit" size={23}/>
                    ) : (
                      <p className='relative text-center'>Looks good</p>
                    )
                  }
                </div>
            </button>
          </div>
        </section>
  )
}

export default ConfirmUsername;