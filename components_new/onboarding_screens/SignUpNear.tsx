
import React from 'react';
import '@near-wallet-selector/modal-ui/styles.css';
import UserBackButton from '../buttons/UserBackButton';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { userOnboardingState } from '../../atoms';

interface SignUpNearInterface {
  handleOnboarding: SetterOrUpdater<number>;
}

function SignUpNear(props: SignUpNearInterface) {

  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);

  return (
    <>
    <div className='md:h-full relative h-screen flex flex-col sm:w-[440px] w-full px-5'>
      <div className='mt-10'>
        <UserBackButton />
        <div className='mt-32'>
          <h1 className='sm:text-4xl text-3xl font-bold mb-2'>Add your Near Wallet <br /> to your ArPage to get <br /> started</h1>
          <p className='text-left text-[#8e8e8f] text-sm mt-7'>
           Due to the recent network upgrade, a Near
           Wallet connection is required to take advantage  
           of ArPage's features.
          </p>
        </div>
      </div>
        
        {/* Button to connect or download arweave  */}
        <div className='mt-[102px] flex justify-center flex-col items-center w-full'>
          <button onClick={() => props.handleOnboarding(3)}
            className="cursor-pointer bg-[#1273ea] w-full px-28 sm:w-[386px] h-[68px] justify-center items-center flex relative flex-row rounded-full text-white font-bold text-lg" >
              <div className='flex justify-center items-center'>
                    <p className='text-center'>Next</p>
              </div>
          </button>
        </div>
    </div>
    </>
  )
}

export default SignUpNear;