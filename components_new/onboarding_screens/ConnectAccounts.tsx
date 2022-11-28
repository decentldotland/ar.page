import { PlusIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil';
import { userOnboardingState } from '../../atoms';
import ConnectedArweaveWallet from './ConnectedArweaveWallet'

function ConnectAccounts() {
    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);

  return (
    <div className='md:relative md:top-32 relative h-screen flex flex-col w-full sm:w-[440px] px-5'>
        <div className=''>
            <div className=' mt-[60px]'>
                <ConnectedArweaveWallet /> 
            </div>
            <div className='mt-[18px]'>
                <h1 className='text-4xl text-left font-bold '>
                    Connect Accounts
                </h1>
                <p className="text-sm text-[#888] mt-3">
                    Connect at least one account to get started.
                </p>
            </div>
        </div>
        


        <div onClick={() => setUserOnboarding(2)} className='cursor-pointer bg-[#f5f5f5] justify-between mt-[40px] py-2 flex items-center  px-3 rounded-2xl'>
            <div className='flex items-center space-x-2.5'>
                <Image src={'/icons/NEAR_WHITE.svg'} height={50} width={50} className={'shadow-2xl bg-black rounded-xl '}/>
                <h1 className='text-sm font-semibold text-left '>Near</h1>
            </div>
            <PlusIcon height={22} width={22} color='#6a6b6a' strokeWidth={2} className='relative  rounded-full p-1 bg-[#d9d9d9] w-[30px] h-[30px] '/>
        </div>
        <h2 className='relative left-3 mt-3 text-[13px] font-medium text-[#8e8e8f] leading-[22px] '>
            <span className='font-bold'>NOTE: </span>
            Due to the recent network upgrade, a Near Wallet connection is  <span className='font-bold'>required </span> to 
            unlock of ArPage's features.
        </h2>
    </div>
  )
}

export default ConnectAccounts