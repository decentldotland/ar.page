import { useAns } from 'ans-for-all'
import Link from 'next/link'
import React from 'react'
import CustomConnectButton from '../buttons/ConnectAccount'
import BackButton from '../reservation/BackButton'
import LineBarTracker from '../reservation/LineBarTracker'

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
  
  return (
    <div className='mt-10'>
        <BackButton setstep={setCurrentStep} step={currentStep - 1}/>
        <div className='mt-6 mb-5 '>
          <LineBarTracker step={0}  total_step={3}/>
        </div>
        
        <h1 className='text-3xl font-bold mb-2'>Connect to Arweave Network</h1>
        <p className='text-left text-[#8e8e8f] text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>  Tenetur qui ducimus, ipsam nesciunt dolorem nisi sunt esse quod, in deleniti blanditiis sequi laudantium. Nesciunt blanditiis voluptatem voluptate sequi ut minima. 
        </p>
        {/* Button to connect or download arweave  */}
        <div className='flex justify-center flex-col items-center w-full'>
              <button  onClick={() => (arconnectConnect as Function)()}
                className="cursor-pointer bg-[#1273ea] w-full h-14 justify-center items-center flex relative flex-row rounded-lg text-white font-bold text-lg" >
                  <div className='flex justify-center items-center'>
                    <p className='text-center'>Download and Setup ArConnect</p>
                    {/* <ArrowLongRightIcon height={20} width={20} className="absolute right-2" color='white'/> */}
                  </div>
              </button>
          <p onClick={() => setCurrentStep(0)} className='cursor-pointer mt-4 text-center text-sm text-[#6a6b6a] font-medium'>
              I will set it up later
          </p>
        </div>
    </div>
  )
}

export default SignUpArConnect