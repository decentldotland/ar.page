import React from 'react'
import { useRecoilState } from 'recoil';
import { confirmModalState, userOnboardingState } from '../../atoms';
import MuiModal from '@mui/material/Modal'
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { shortenAddress, shortenName } from '../../src/utils';

interface Props {   
    address?: string,
    disconnectFunction?: any 
}


function ModalConfirm({address, disconnectFunction}: Props) {
    const [showModal, setShowModal] = useRecoilState(confirmModalState);
    const handleClose = () => {  setShowModal(false )}
    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
    return (

    <MuiModal
        className="fixes !top-7 left-0 right-0 
          z-50 mx-auto w-full max-w-5xl 
          overflow-hidden overflow-y-scroll 
          rounded-md scrollbar-hide items-center flex flex-col justify-center
          "
        open={showModal}
        onClose={handleClose}>
        <>
            <section className='py-[39px] relative bottom-10 bg-white w-[388px] h-[335px] rounded-[20px]  '>
                <div className="flex flex-col justify-center items-center">
                    <h1 className='text-center font-semibold text-3xl'>Hello</h1>


                    <div className='items-center w-[201px] px-2 mt-[22px] mb-[13px] py-2 justify-between flex rounded-full bg-[#f2f3f5] border-0'>
                        <div className='space-x-2 flex flex-row '>
                            <div className="rounded-full p-1  bg-black items-center flex justif0">
                                <Image
                                    width={19}
                                    height={19}
                                    className="bg-white rounded-full p-2 border-4 border-black"
                                    src={"/icons/ARWEAVE.svg"}
                                    alt=""
                                    quality={100} />
                            </div>
                            <h1 className='font-bold text-left text-base text-[#3a3a3a]'>{shortenAddress(address!)}</h1>
                        </div>
                        
                        <ChevronDownIcon height={15} width={20} strokeWidth={4} className=""  />
                    </div>  
                </div>
                <div>
                    <h2 className='text-sm
                     font-regular text-[#8e8e8f] px-24'>Press <span className='font-bold'>Confirm </span>to confirm the wallet to use for your ArPage.
                    </h2>
                </div>
                <div className="flex flex-row space-x-2.5 justify-center  mt-[44px]">
                    <div onClick={() => {
                        disconnectFunction()
                        handleClose()
                    }} className='cursor-pointer text-lg bg-[#e84040]/20 rounded-full px-[19px] py-3 font-bold text-[#e84040]   '>Disconnect</div>
                    <div onClick={() => setUserOnboarding(userOnboardingStep + 1)} className='cursor-pointer text-lg bg-[#1273ea] rounded-full px-[52px] py-3 font-bold text-white   '>Confirm</div>
                </div>
            </section>
        </>
    </MuiModal>

  )
}

export default ModalConfirm