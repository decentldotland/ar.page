import { ArrowLongRightIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { avatarModalState, selectedAvatar, userOnboardingState } from '../../atoms';
import {MdOutlineAddAPhoto, MdOutlineAddPhotoAlternate} from 'react-icons/md'
import MainNextButton from '../buttons/MainNextButton';
import ModalAvatarSelection from './ModalAvatarSelection';
import Image from 'next/image';
import { ARWEAVE_URL } from '../../src/constants';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function AvatarSelectionPage() {
    // Modal State for avatar selection 
    const showModalValue = useRecoilValue(avatarModalState)
    const [showModal, setShowModal] = useRecoilState(avatarModalState);
    
    // user onboarding step 
    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);
    const [currentSelectedAvatar, setSelectedAvatar] = useRecoilState(selectedAvatar);
    const [isImageReady, setIsImageReady] = useState(false)

    

  return (
    <>
        <section className="md:relative md:top-32 relative h-screen flex flex-col w-full sm:w-[440px] px-5 justify-between  ">
            <div className='mt-[77px]'>
                <div className=''>
                    {/* <UserBackButton /> */}
                    <h1 className="text-4xl font-bold mt-5">Choose a profile picture.</h1>
                    <p className="text-sm self-start mb-6 mt-5 text-[#888]">
                        Choose a photo that best represents you!
                    </p>
                </div>
                <div onClick={() => setShowModal(true)} className='flex flex-row justify-center mt-8'>
                    {
                        currentSelectedAvatar ? (
                            <>
                                {!isImageReady && (<Skeleton circle width={237} height={237}/>)}
                               <Image 
                                    hidden={isImageReady}
                                    src={ARWEAVE_URL + currentSelectedAvatar.id} 
                                    height={237} 
                                    onLoad={() => setIsImageReady(true)}
                                    width={237} 
                                    objectFit='cover' className='rounded-full bg-[#edecec]' />    
                            </>
                        ) : (
                            <div  className='cursor-pointer rounded-full w-[237px] h-[237px] bg-[#edecec] items-center flex flex-row justify-center'>
                                <MdOutlineAddPhotoAlternate size={25} color={"#6a6b6a"} />
                            </div>
                        )
                    }
                </div>
                <h1 className='text-center mt-10 text-sm text-[#8e8e8f] cursor-pointer'>or choose from Decent Land Collection</h1>
            </div>
            {/* 
            <div className='mt-12 flex flex-col space-y-6'>
                <button className=" bg-[#1273ea] w-full h-14 items-center cursor-pointer relative rounded-full text-white font-bold text-lg" >
                    <div className='flex justify-center items-center'>
                    <p className='relative text-center '>Browse your NFT Collections</p>
                    </div>
                </button>
                <button className=" bg-[#1273ea]  h-14 cursor-pointer items-center relative rounded-full text-white font-bold text-lg" >
                    <div className='flex justify-center items-center'>
                    <p className='relative text-center '>Decent Land Avatar Collection</p>
                    </div>
                </button>
            </div>
            */}
            <div className='relative bottom-[71px]'>
                <MainNextButton btnName='Next' disabled={!currentSelectedAvatar}/>
                <h1 onClick={() => setUserOnboarding(userOnboardingStep + 1)} className='font-bold text-center mt-6 text-sm text-[#8e8e8f] cursor-pointer'>Skip</h1>
            </div>
        </section>

        {showModalValue && (<ModalAvatarSelection />) }

    </>
  )
}

export default AvatarSelectionPage