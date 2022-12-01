import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useAns } from 'ans-for-all';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { confirmModalState, userOnboardingState } from '../../atoms';
import { shortenAddress, shortenName } from '../../src/utils';
import ModalConfirm from './ModalConfirm';

function ConnectedArweaveWallet() {
    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);

  const {  address, arconnectConnect, walletConnected, arconnectDisconnect } = useAns();
  const showModalValue = useRecoilValue(confirmModalState)
  const [showModal, setShowModal] = useRecoilState(confirmModalState);
  const [connected, setConnected] = useState(false)
    useEffect(() => {
        if (!address) return setConnected(false)

        setConnected(true)
    }, [address])
    

  const connectButton = () =>  {
    
    if (connected) setShowModal(true)
    else {
        (arconnectConnect as Function)()
    }
  }



  

  return (
    <>
        <div className='flex items-center '>
                
                    <div onClick={connectButton} className='hover:bg-[#EDECEC] p-2 items-center flex rounded-lg space-x-2 cursor-pointer'>
                        <div className='w-[32px] h-[32px] items-center flex justify-center rounded-lg bg-black'>
                            <Image src={'/icons/ARWEAVE_WHITE.svg'}  quality={80} height={22} width={22}/>
                        </div>
                        {
                            connected  ?  (
                                <div className=''>
                                <p className="text-xs text-left ext-[#8e8e8f]">Linking Accounts to:</p>
                                <div className='flex items-center space-x-2'>
                                    <h1 className='font-semibold text-left text-sm'>
                                        {shortenAddress(address!, 6, 4)}
                                    </h1>
                                    <ChevronDownIcon height={15} width={20} strokeWidth={4} className=""  />
                                </div>
                            </div>

                            ) : (
                                <div className='text-sm text-left font-semibold'>
                                    Connect your wallet 
                                </div>
                            )
                        }
                       
                    </div>
                    
            
            
        </div>
        {showModalValue && (<ModalConfirm overrideConfirmButton={userOnboardingStep} networkLogo={"/icons/ARWEAVE.svg"} address={address} disconnectFunction={() => (arconnectDisconnect as Function)()} />) }

    </>
  )
}

export default ConnectedArweaveWallet