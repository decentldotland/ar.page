import { ArrowUpRightIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiOutlineSwitchHorizontal, HiSwitchHorizontal } from 'react-icons/hi'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userOnboardingState } from '../../atoms'
import MainNextButton from '../buttons/MainNextButton'
import { Divider } from '../user/components/reusables'



function VerifyWithArk() {
    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
    const userCurrentStep = useRecoilValue(userOnboardingState)
  return (
    <div className='mt-[60px] w-full px-5 sm:w-[440px]'>
        <div className='items-center flex flex-col justify-center'>
            
            {/* TITLEs */}
            <div className='text-center items-center space-y-4'>
                <h1 className="text-sm text-[#8e8e8f] font-medium">Verify with Ark Protocol</h1>
                <h1 className="font-bold text-lg sm:text-xl">Ark Protocol wants to connect your <br /> Near Wallet Account on Arweave</h1>
            </div>
            {/* CRYPTO NETWORKS */}
            <div className='flex flex-row items-center  space-x-6 mt-[48px]'>
                {/* NEAR LOGO */}
                <div className='w-[52px] h-[52px] rounded-2xl shadow-md border-2 border-[#edecec] items-center flex justify-center'>
                    <Image src={'https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=023'} 
                        height={34.7} 
                        width={34.7} 
                    />
                </div>
                <HiOutlineSwitchHorizontal size={24}  color={'#b3b2b3'}/>
                {/* Arweave LOGO */}
                <div className='w-[52px] h-[52px] rounded-2xl shadow-md border-2 border-[#edecec] items-center flex justify-center'>
                    <Image src={'https://cryptologos.cc/logos/arweave-ar-logo.svg?v=023'} 
                        height={34.7} 
                        width={34.7} 
                    />
                </div>
            </div>

            <h1 className='font-medium mt-[54px] text-[#3a3a3a]'>
                Once connected, this will allow <span className='font-bold'>ar.page</span> to:
            </h1>

            {/* Permitted list */}
            <div className='mt-5 w-full'>
                <ul className='sm:space-y-6 space-y-3.5'>
                    <li className={listStyle}>
                        <div className="rounded-full h-[37px] w-[37px] items-center flex justify-center bg-[#78FF75]/30 opacity-100 rotate-6">
                            <CheckIcon height={16} width={16} strokeWidth={3} color={'#1CC16A'} />
                        </div>
                        <h1>
                            Read address of your permitted account.
                        </h1>
                    </li>
                    <li className={listStyle}>
                        <div className="rounded-full h-[37px] w-[37px] items-center flex justify-center bg-[#78FF75]/30 opacity-100 rotate-6">
                            <CheckIcon height={16} width={16} strokeWidth={3} color={'#1CC16A'} />
                        </div>
                        <h1>
                            Aggregate transaction activity of your <br /> permitted account.
                        </h1>
                    </li>
                    <li className={listStyle}>
                        <div className="rounded-full h-[37px] w-[37px] items-center flex justify-center bg-[#78FF75]/30 opacity-100 rotate-6">
                            <CheckIcon height={16} width={16} strokeWidth={3} color={'#1CC16A'} />
                        </div>
                        <h1>
                            Read asset metadata, including names, <br /> URIs and price.
                        </h1>
                    </li>
                    <li className={listStyle}>
                        <div className="rounded-full h-[37px] w-[37px] items-center flex justify-center bg-[#e84040]/30 opacity-100 rotate-6">
                            <XMarkIcon height={16} width={16} strokeWidth={3} color={'#e84040'} />
                        </div>
                        <h1>
                            This does not allow the app to transfer <br /> tokens.
                        </h1>
                    </li>
                </ul>
            </div>

            <div className='w-full sm:mt-[71px] mt-8 space-y-3 text-sm'>
                <div className='justify-between flex flex-row'>
                    <h1 className='font-semibold text-left text-[#6a6b6a]'>Ark Protocol Contract</h1>
                    <div className=' flex flex-row items-center space-x-2'>
                        <h2>JohnApple</h2>
                        <ArrowUpRightIcon color='#8e8e8f' height={14} width={14} />   

                    </div>
                </div>
                <div className='justify-between flex flex-row '>
                    <h1 className='font-semibold text-left text-[#6a6b6a]'>Network Fee</h1>
                    <h2>JohnApple</h2>
                </div>
            </div>
        </div>
        <Divider />
        <div className='relative bottom-6'>
            <MainNextButton btnName='Next'  />
            <div className='space-y-2 mt-6 text-[#6a6b6a] font-medium text-center'>
              <button onClick={() => setUserOnboarding(userOnboardingStep - 1)} >
                <h1 className='underline cursor-pointer'>
                  Cancel
                </h1>
              </button>
            </div>
          </div>

    </div>
  )
}

export default VerifyWithArk


const listStyle = 'items-center text-sm flex flex-row  space-x-5 text-left font-medium text-[#6a6b6a] '


