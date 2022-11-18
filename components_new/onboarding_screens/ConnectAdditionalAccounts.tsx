import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import React from 'react'
import { useRecoilState } from 'recoil';
import { userOnboardingState } from '../../atoms';
import { useWalletSelector } from '../../src/contexts/WalletSelectorContext';
import MainNextButton from '../buttons/MainNextButton';
import ConnectedArweaveWallet from './ConnectedArweaveWallet';





function ConnectAdditionalAccounts() {

    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
    const  {accountId} = useWalletSelector()


  return (
    <div className='relative h-screen flex flex-col w-full sm:w-[440px] px-5 justify-between'>
        <div>
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

            <section className='space-y-3.5'>
                <div className='cursor-pointer bg-[#f5f5f5] justify-between mt-[40px] py-2 flex items-center  px-3 rounded-2xl'>
                    <div className='flex items-center space-x-2.5'>
                        <Image src={'/icons/NEAR_WHITE.svg'} height={50} width={50} className={'shadow-2xl bg-black rounded-xl '}/>
                        <h1 className='text-sm font-semibold text-left '>{accountId}</h1>
                    </div>

                    {
                        accountId ? (
                            <XMarkIcon height={26} width={26} color='#6a6b6a' strokeWidth={2} className=' '/>
                        ) : (
                            <PlusIcon height={22} width={22} color='#6a6b6a' strokeWidth={2} className='relative left-4 rounded-full p-1 bg-[#d9d9d9] w-[30px] h-[30px] '/>
                        )
                    }
                </div>
            </section>
        </div>
        
        <div className='relative bottom-[98px]'>
            <MainNextButton btnName='Continue'  />

        </div>

    </div>
  )
}

export default ConnectAdditionalAccounts