import { useAns } from 'ans-for-all'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Ans } from '../../src/types'
import CustomConnectButton from '../buttons/ConnectAccount'
import BackButton from '../reservation/BackButton'
import LineBarTracker from '../reservation/LineBarTracker'
import { AccountWidget } from './AccountWidget'

interface Props { 
    setCurrentStep: any,
    currentStep: number
  }

function SignUpArConnect({setCurrentStep, currentStep}: Props) {
  const [login, setLogin] = useState(false)
  const {
    walletConnected,
    ansData,
    arconnectConnect,
    arconnectDisconnect,
    shortenAddress,
    address
  } = useAns();

  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<Ans>()
  const connectbutton = () => { 
    
    setLoading(true);
   
    // If wallet is not connect, call arconnect
    if (!walletConnected) (arconnectConnect as Function)()
    setLoading(false)
    // if (walletConnected) setCurrentStep(2)
  }


  const onSubmit = async () => { 
      setLoading(true)
      await arconnectConnect?.()
        .catch((e) => alert(e.message))
        .finally(() => setLoading(false))
  }


  console.log(walletConnected)
  console.log(ansData)


  const ConnectButton = () => { 
    if (!walletConnected) {
      return (
        <div className='mb-[113px] flex justify-center flex-col items-center w-full'>
          <button  onClick={onSubmit}
            className="cursor-pointer bg-[#1273ea] w-[386px] h-14 justify-center items-center 
              flex relative flex-row rounded-full text-white font-bold text-lg" >
              <div className='flex justify-center items-center'>
                <p className='text-center'>Connect</p>
                {/* <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/> */}
              </div>
          </button>
        </div>
      )
    } 
    return (
      <>
        <div className='items-center justify-center flex relative bottom-40'>
            <AccountWidget 
              upperMessage='Your Connected Wallet'   
              displayImg={ansData?.address_color}
              chainIconUrl='/icons/ARWEAVE.svg'
              address={address}
              walletName='Arweave Wallet'
              backgroundColour='bg-white'
              link=''
              disconnect={(arconnectDisconnect as Function)()}
            />
          </div>
        {/* Button to connect or download arweave  */}
        <div className='mb-[113px] flex justify-center flex-col items-center w-full'>
          <button onClick={() => setCurrentStep(2)}
            className="cursor-pointer bg-[#1273ea] w-[386px] h-14 justify-center items-center 
              flex relative flex-row rounded-full text-white font-bold text-lg" >
              <div className='flex justify-center items-center'>
                <p className='text-center'>Next</p>
              </div>
          </button>
        </div>
      </>
    )
  }
  
  
  return (
    <div className='relative h-screen flex flex-col justify-between w-[440px]'>
      <div className='mt-10'>
        <BackButton setstep={setCurrentStep} step={currentStep - 1}/>
        <div className='mt-6 mb-5 '>
          <LineBarTracker step={0}  total_step={3}/>
        </div>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Connect to Arweave Network</h1>
          <p className='text-left text-[#8e8e8f] text-sm'>
            The contracts live in the Arweave network. <br/>  
            Tenetur qui ducimus, ipsam nesciunt dolorem nisi sunt esse quod, 
            in deleniti blanditiis sequi laudantium. Nesciunt blanditiis voluptatem voluptate sequi ut minima. 
          </p>
        </div>
      </div>
      <ConnectButton />
    </div>
  )
}

export default SignUpArConnect


