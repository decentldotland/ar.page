import { useAns } from 'ans-for-all'
import Image from 'next/image'
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
        <div className="mt-[216px] items-center flex flex-col  h-full space-y-7">
          <h1 className='font-bold text-4xl text-center'>
            Create an account <br /> for ArPage
          </h1>
          <h2 className='text-sm text-[#8e8e8f] text-center font-normal'>
            Create a shareable handle, follow other users, <br /> connect to DAO communities using ArPage.
          </h2>
        </div>
          
          {/* Button to connect or download arweave  */}
          <div className='mt-[99px] flex justify-center flex-col items-center w-full'>
            <button onClick={connected ? nextButton : connectButton}
              className="cursor-pointer  bg-black text-white w-full  sm:w-[386px] h-[68px] justify-center items-center flex relative flex-row rounded-full font-bold text-lg" >
                <div className='flex justify-center items-center space-x-3'>
                      <Image src={'/icons/ARWEAVE_WHITE.svg'} height={26.2} width={26.2}/>
                      <p className='text-center'>Continue with ArConnect</p>
                  {/* <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/> */}
                </div>
            </button>
          </div>
          <div className='space-y-2 mt-8 text-[#6a6b6a] font-medium text-center flex flex-row space-x-1 items-end justify-center'>
              <h1 className="text-sm ">Already have profile?</h1>
              <a href={"/"} >
                <h1 className='underline  font-bold cursor-pointer text-[#6a6b6a]'>
                  Sign in
                </h1>
              </a>
            </div>
      </div>
      {/* show confirmation  */}
      {showModalValue && (<ModalConfirm  address={address} disconnectFunction={() => (arconnectDisconnect as Function)()} />) }
    </>
  )
}

export default SignUpArConnect


