import { PlusIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React, { MouseEventHandler } from 'react'
import { SetterOrUpdater, useRecoilState } from 'recoil';
import ConnectedArweaveWallet from './ConnectedArweaveWallet';
import { walletModifier } from '../../src/utils/walletModifier';
import clsx from 'clsx';
import { useState } from 'react';

interface ConnectAccountsInterface {
    connect: () => void;
    disconnect: () => void;
    handleNearLink: () => Promise<void>;
    linkStatus: boolean;
    addressAr: string | undefined;
    addressNear: string | null;
    handleOnboarding: SetterOrUpdater<number>;
}

function ConnectAccounts(props: ConnectAccountsInterface) {
  const btnDynamicStyling = clsx(
    "cursor-pointer bg-[#f5f5f5] justify-between mt-[40px] py-2 flex items-center px-3 rounded-2xl",
    props.addressNear ? "border-4 border-emerald-400" : ""
  );

  const [linked, setLinked] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleLinkConfiguration = async () => {
    await setClicked(true);
    props.handleNearLink().then(() => setLinked(true));
  }

  useState
  return (
    <div className='md:relative md:top-32 relative h-screen flex flex-col w-full sm:w-[440px] px-5'>
        <div className=''>
            <div className=' mt-[60px]'>
                <ConnectedArweaveWallet
                    addressAr={walletModifier(props.addressAr, 4, 5)}
                /> 
            </div>
            <div className='mt-[18px]'>
                <h3 className='text-4xl text-left font-bold '>
                    Connect Accounts
                </h3>
                <p className="text-sm text-[#888] mt-3">
                    Connect at least one account to get started.
                </p>
            </div>
        </div>
        {!linked ?
        (
            <div onClick={() => props.addressNear ? handleLinkConfiguration() : props.connect()} className={btnDynamicStyling}>
                <div className='flex items-center space-x-2.5'>
                    <Image src={'/icons/NEAR_WHITE.svg'} height={50} width={50} className={'shadow-2xl bg-black rounded-xl '} alt="Near Logo"/>
                    <h3 className='text-sm font-semibold text-left '>
                        {props.addressNear ? (!clicked ? walletModifier(props.addressNear, 5, 8) + " connected. Click again to link." : "Linking...") : "Near"}
                    </h3>
                </div>
                <PlusIcon height={22} width={22} color='#6a6b6a' strokeWidth={2} className='relative left-4 rounded-full p-1 bg-[#d9d9d9] w-[30px] h-[30px] '/>
            </div>
        ) 
        :
        (
            <div onClick={() => props.handleOnboarding(2)} className={btnDynamicStyling}>
                <div className='flex items-center space-x-2.5'>
                    <Image src={'/icons/NEAR_WHITE.svg'} height={50} width={50} className={'shadow-2xl bg-black rounded-xl '} alt="Near Logo"/>
                    <h3 className='text-sm font-semibold text-left '>
                        Linked. Please Proceed.
                    </h3>
                </div>
                <PlusIcon height={22} width={22} color='#6a6b6a' strokeWidth={2} className='relative left-4 rounded-full p-1 bg-[#d9d9d9] w-[30px] h-[30px] '/>
            </div>         
        )}
        <p className='relative left-3 mt-3 text-[13px] font-medium text-[#8e8e8f] leading-[22px] '>
            <span className='font-bold'>NOTE: </span>
            Due to the recent network upgrade, a Near Wallet connection is  <span className='font-bold'>required </span> to 
            unlock of ArPage's features.
        </p>
        {props.addressNear && (
        <p className='relative left-3 mt-3 text-[13px] font-medium text-[#8e8e8f] leading-[22px] cursor flex items-center justify-center' onClick={() => props.disconnect()}>
            <span className='underline align-center cursor-pointer'>Disconnect</span>
        </p>
        )}
    </div>
  )
}

export default ConnectAccounts