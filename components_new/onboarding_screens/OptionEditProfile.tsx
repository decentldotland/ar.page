import React from 'react'
import { useRecoilState } from 'recoil';
import { userOnboardingState } from '../../atoms';
import MainNextButton from '../buttons/MainNextButton';
import UserBackButton from '../buttons/UserBackButton';
import { getOnboardingStepNumeric, setOnboardingStep } from '../../src/utils/onboardingHelper';

function OptionEditProfile() {
    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  return (
    <section className=" h-screen relative w-full flex flex-col px-5 sm:w-[440px]">
            <div className='mt-10 z-10'>
              <UserBackButton />
            </div>
            <div className="flex flex-col justify-center h-screen relative">
                <div className="items-center flex flex-col space-y-6">
                    <p className='font-bold text-4xl text-center'>
                        So far, so good!👍
                    </p>
                    <p className='text-sm text-[#8e8e8f] text-center font-normal'>
                        Would you like to edit your profile page now?
                    </p>
                    <MainNextButton btnName='Take me there' />
                    <div className='space-y-2 mt-6 text-[#6a6b6a] font-medium text-center'>
                        <button 
                            onClick={() => {
                                setOnboardingStep("11");
                                setUserOnboarding(getOnboardingStepNumeric());
                            }} 
                        >
                            <p className='cursor-pointer font-bold'>
                                Maybe later.
                            </p>
                        </button>
                    </div>
                </div>
            </div>

    </section>
  )
}

export default OptionEditProfile;