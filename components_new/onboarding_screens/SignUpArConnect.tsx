import { useAns } from 'ans-for-all'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { confirmModalState } from '../../atoms'
import { useArconnect } from '../../hooks/useArconnect'
import { Ans } from '../../src/types'
import CustomConnectButton from '../buttons/ConnectAccount'
import UserBackButton from '../buttons/UserBackButton'
import BackButton from '../reservation/BackButton'
import LineBarTracker from '../reservation/LineBarTracker'
import { AccountWidget } from './AccountWidget'
import ModalConfirm from './ModalConfirm'


function SignUpArConnect() {
  const [login, setLogin] = useState(false)
  // Show confirmation modal 
  const showModalValue = useRecoilValue(confirmModalState)
  const [showModal, setShowModal] = useRecoilState(confirmModalState);

  const {
    walletConnected,
    ansData,
    arconnectConnect,
    arconnectDisconnect,

    address
  } = useAns();

  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<Ans>()
  const [connected, setConnected] = useState(false)

  const connectButton = () => { 
    setLoading(true);
    // If wallet is not connect, call arconnect
    if (!walletConnected) (arconnectConnect as Function)()
    setLoading(false)
    // if (walletConnected) setCurrentStep(2)
  }
  const nextButton = () => { 
    // setCurrentStep(2)
    setShowModal(true)

  }

  useEffect(() => {
    if (walletConnected) { 
      setConnected(true)
    } else { 
      setConnected(false)
    }
  
  }, [walletConnected])
  


  console.log(address)  
  
  return (
    <>
      <div className='relative h-full flex flex-col w-full sm:w-[440px] px-5'>
        <div className='mt-10'>
          <UserBackButton/>
          {/* <div className='mt-6 mb-5 '>
            <LineBarTracker step={1}  total_step={3}/>
          </div> */}
          <div className='mt-32 '>
            <h1 className='sm:text-4xl text-4xl font-semibold mb-2 text-[#3a3a3a]'>Sign in through your <br /> <span className="font-bold text-black">Arweave Wallet</span> <br /> to get started.</h1>
            <p className='text-left text-[#8e8e8f] text-sm font-medium mt-4'>
            You'll be prompted to setup the wallet<br/>  
            automatically if no wallet is found. 
            </p>
          </div>
        </div>
          
          {/* Button to connect or download arweave  */}
          <div className='mt-[102px] flex justify-center flex-col items-center w-full'>
            <button onClick={connected ? nextButton : connectButton}
              className="cursor-pointer bg-[#1273ea] w-full px-28 sm:w-[386px] h-14 justify-center items-center flex relative flex-row rounded-full text-white font-bold text-lg" >
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
      {/* show confirmation  */}
      {showModalValue && (<ModalConfirm  address={address} disconnectFunction={() => (arconnectDisconnect as Function)()} />) }
    </>
  )
}

export default SignUpArConnect


