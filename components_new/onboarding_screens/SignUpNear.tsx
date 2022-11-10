import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CustomConnectButton from '../buttons/ConnectAccount'
import BackButton from '../reservation/BackButton'
import LineBarTracker from '../reservation/LineBarTracker'
import { useWalletSelector } from '../../src/contexts/WalletSelectorContext'
import '@near-wallet-selector/modal-ui/styles.css';
import type { AccountView } from "near-api-js/lib/providers/provider";
import { CircularProgress } from '@mui/material'



interface Props { 
    setCurrentStep: any,
    currentStep: number
  }

/**
 * Page to connect to user's near wallets, supports currently:
 * -  WalletConnect 
 * - Near Wallet 
 * @param param0 
 * @returns 
 */
function SignUpNear({setCurrentStep, currentStep}: Props) {

  const [connected, setConnected] = useState(false)
  const { selector, modal, accounts, accountId } = useWalletSelector();

  const connectButton = () => { 
    setConnected(true)
    modal.show();
  }

  const nextButton = () => { 
    setCurrentStep(3)
  }

  useEffect(() => {
    if (accountId !== null) setConnected(false)

  }, [accountId, modal])
  

  return (
    <div className='relative h-screen flex flex-col justify-between w-[440px]'>
      <div className='mt-10'>
        <BackButton setstep={setCurrentStep} step={currentStep - 1}/>
        <div className='mt-6 mb-5 '>
          <LineBarTracker step={1}  total_step={3}/>
        </div>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Connect with Near Network</h1>
          <p className='text-left text-[#8e8e8f] text-sm'>
           Application requires connection to Near Network<br/>  
            as part of Arweave Name Service upgrade.
          </p>
        </div>
      </div>
        
        {/* Button to connect or download arweave  */}
        <div className='mb-[113px] flex justify-center flex-col items-center w-full'>
          <button onClick={connected ? nextButton : connectButton}
            className="cursor-pointer bg-[#1273ea] w-[386px] h-14 justify-center items-center flex relative flex-row rounded-full text-white font-bold text-lg" >
              <div className='flex justify-center items-center'>
                {
                  connected ? (
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
  )
}

export default SignUpNear