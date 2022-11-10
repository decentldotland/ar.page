import { useAns } from 'ans-for-all'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CustomConnectButton from '../buttons/ConnectAccount'
import BackButton from '../reservation/BackButton'
import LineBarTracker from '../reservation/LineBarTracker'
import { UserAccountDetails } from '../reservation/UserAccountDetails'

interface Props { 
    setCurrentStep: any,
    currentStep: number
  }

function SignUpArConnect({setCurrentStep, currentStep}: Props) {
  
  const {
    walletConnected,
    ansData,
    arconnectConnect,
    arconnectDisconnect,
    shortenAddress,
  } = useAns();

  const [loading, setLoading] = useState<boolean>(false)
  const connectbutton = () => { 
    setLoading(true);

    // If wallet is not connect, call arconnect
    if (!walletConnected) (arconnectConnect as Function)()

    setLoading(false)
    setCurrentStep(2)
  }


  
  
  return (
    <div className='relative h-screen flex flex-col justify-between '>
      <div className='mt-10'>
        <BackButton setstep={setCurrentStep} step={currentStep - 1}/>
        <div className='mt-6 mb-5 '>
          <LineBarTracker step={0}  total_step={3}/>
        </div>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Connect to Arweave Network</h1>
          <p className='text-left text-[#8e8e8f] text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>  
            Tenetur qui ducimus, ipsam nesciunt dolorem nisi sunt esse quod, 
            in deleniti blanditiis sequi laudantium. Nesciunt blanditiis voluptatem voluptate sequi ut minima. 
          </p>
        </div>
      </div>
        
        {/* Button to connect or download arweave  */}
        <div className='mb-[113px] flex justify-center flex-col items-center w-full'>
          <button  onClick={connectbutton}
            className="cursor-pointer bg-[#1273ea] w-[386px] h-14 justify-center items-center 
              flex relative flex-row rounded-full text-white font-bold text-lg" >
              <div className='flex justify-center items-center'>
                <p className='text-center'>Connect</p>
                {/* <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/> */}
              </div>
          </button>
        
        </div>
    </div>
  )
}

export default SignUpArConnect