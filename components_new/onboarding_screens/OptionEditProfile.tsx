import React from 'react'
import { useRecoilState } from 'recoil';
import { userOnboardingState } from '../../atoms';
import MainNextButton from '../buttons/MainNextButton'
import UserBackButton from '../buttons/UserBackButton'

function OptionEditProfile() {
    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  return (
    <section className=" h-screen relative w-full flex flex-col px-5 sm:w-[440px]">
            <div className='mt-10'>
              <UserBackButton />
            </div>
            <div className="flex flex-col justify-center h-screen relative bottom-20">
                <div className="items-center flex flex-col space-y-7">
                    <h1 className='font-bold text-4xl text-center'>
                        So far, so good!👍
                    </h1>
                    <h2 className='text-sm text-[#8e8e8f] text-center font-normal'>
                        Would you like to edit your profile page now?
                    </h2>
                </div>
            </div>
            <div className='w-full relative bottom-[71px]'>
                <MainNextButton btnName='Take me there' />
                <div className='space-y-2 mt-6 text-[#6a6b6a] font-medium text-center'>
                    <button onClick={() => setUserOnboarding(userOnboardingStep - 1)} >
                        <h1 className='cursor-pointer font-bold'>
                            Maybe later.
                        </h1>
                    </button>
                </div>
            </div>
    </section>
  )
}

export default OptionEditProfile