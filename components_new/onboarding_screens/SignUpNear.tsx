import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CustomConnectButton from '../buttons/ConnectAccount'
import BackButton from '../reservation/BackButton'
import LineBarTracker from '../reservation/LineBarTracker'
import { useWalletSelector } from '../../src/contexts/WalletSelectorContext'
import '@near-wallet-selector/modal-ui/styles.css';
import type { AccountView } from "near-api-js/lib/providers/provider";
import { CircularProgress } from '@mui/material'
import UserBackButton from '../buttons/UserBackButton'
import { useRecoilState, useRecoilValue } from 'recoil'
import { confirmModalState, nearWalletConnected, userOnboardingState } from '../../atoms'
import ModalConfirm from './ModalConfirm'



/**
 * Page to connect to user's near wallets, supports currently:
 * -  WalletConnect 
 * - Near Wallet 
 * @param param0 
 * @returns 
 */
function SignUpNear() {

  const [connected, setConnected] = useState(false)
  const { selector, modal, accounts, accountId } = useWalletSelector();
  const [account, setAccount] = useState()
  // user step 
  const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
  const userCurrentStep = useRecoilValue(userOnboardingState)

  // Confirmation modal
  const showModalValue = useRecoilValue(confirmModalState)
  const [showModal, setShowModal] = useRecoilState(confirmModalState);

  const [nearWalletConnection, setNearWalletConnected] = useRecoilState(nearWalletConnected);


  /**
   * 1. Check if the Near wallet is not null, setConnected to false
   * 2  User is signed in using their Near wallet
   * 3. Save {@code currentStep} to localstorage and set {@code triggered} to false
   */
  useEffect(() => {
    if (!accountId) {
      setNearWalletConnected(false)
      localStorage.setItem('triggered', 'false')
      return setConnected(false);
    }
    setNearWalletConnected(true)

    // Save on localstorage currenste
    localStorage.setItem('currentStep', `${userOnboardingStep}`)
    localStorage.setItem('triggered', 'false')
    
    return setConnected(true)
  }, [accountId, nearWalletConnection])


  const connectButton = () => { 
    modal.show();
  }
  const handleSignOut = async () => {
    const wallet = await selector.wallet();

    wallet.signOut().catch((err) => {
      console.log("Failed to sign out");
      console.error(err);
    });
  };

  const nextButton = () => { 
    // If account is null, trigger connectButton again regardless
    setShowModal(true)

  }

  return (
    <>
    <div className='relative h-screen flex flex-col sm:w-[440px] w-full px-5'>
      <div className='mt-10'>
        <UserBackButton />
        {/* <div className='mt-6 mb-5 '>
          <LineBarTracker step={1}  total_step={3}/>
        </div> */}
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
          <button onClick={connected && accountId ? nextButton : connectButton}
            className="cursor-pointer bg-[#1273ea] w-full px-28 sm:w-[386px] h-[68px] justify-center items-center flex relative flex-row rounded-full text-white font-bold text-lg" >
              <div className='flex justify-center items-center'>
                {
                  connected && accountId ? (
                    <p className='text-center'>Next</p>

                  ) : (
                    <p className='text-center'>Connect</p>
                  )
                }
                {/* <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/> */}
              </div>
          </button>
        </div>
    </div>
    {showModalValue && (<ModalConfirm  address={accountId!} disconnectFunction={handleSignOut} />) }

    </>

  )
}

export default SignUpNear