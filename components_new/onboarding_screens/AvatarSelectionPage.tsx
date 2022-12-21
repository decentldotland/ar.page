import React, { SetStateAction, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { avatarModalState, userOnboardingState } from '../../atoms';
import UserBackButton from '../buttons/UserBackButton';
import BackButton from '../reservation/BackButton';
import {MdOutlineAddAPhoto, MdOutlineAddPhotoAlternate} from 'react-icons/md'
import MainNextButton from '../buttons/MainNextButton';
import ModalAvatarSelection from './ModalAvatarSelection';
import Image from 'next/image';
import { getOnboardingStepNumeric, setOnboardingStep } from '../../src/utils/onboardingHelper';

interface AvatarProps {
    handleNftPayload: () => Promise<string[]>;
    handleSelectedProfile: React.Dispatch<SetStateAction<string>>;
    profileSrc: string;
}

function AvatarSelectionPage(props: AvatarProps) {

    const showModalValue = useRecoilValue(avatarModalState)
    const [showModal, setShowModal] = useRecoilState(avatarModalState);
    const [userOnboardingStep, setUserOnboarding] = useRecoilState(userOnboardingState);

    return (
        <>
        <section className="md:relative md:top-32 relative h-screen flex flex-col w-full sm:w-[440px] px-5">
            <div className='mt-[30px] md:mt-[0px]'>
                <div className=''>
                    <p className="text-4xl font-bold mt-5 text-center">
                        Choose a profile picture.
                    </p>
                    <p className="text-sm self-start mb-6 mt-5 text-[#888] text-center">
                        Choose a photo that best represents you!
                    </p>
                </div>
                {/*If no Image File or Src Selected, Show Add Photo Display*/}
                {!props.profileSrc ?
                    <>
                        <div 
                            onClick={() => {
                                setShowModal(true);
                                props.handleSelectedProfile("");
                            }} 
                            className='flex flex-row justify-center mt-8'
                        >
                            <div className='cursor-pointer rounded-full w-[237px] h-[237px] bg-[#edecec] items-center flex flex-row justify-center'>
                                <MdOutlineAddPhotoAlternate size={45} color={"#6a6b6a"} />
                            </div>
                        </div>
                        <a href="https://mint.decent.land/" className='flex justify-center text-center mt-10 text-sm text-[#8e8e8f] cursor-pointer self-center'>or choose from Decent Land Collection</a>
                    </>
                :
                    <>
                        <div className='flex flex-row justify-center mt-8'>
                            <div className='rounded-full w-[237px] h-[237px] bg-[#edecec] items-center flex flex-row justify-center relative'>
                                {/*Check if an Image File or Image Src has Been Selected */}
                                <Image 
                                    src={props.profileSrc ? props.profileSrc : ""} 
                                    alt="Selected Profile Picture" 
                                    className="rounded-full"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                        <p 
                            className='text-center mt-10 text-sm text-[#8e8e8f] cursor-pointer' 
                            onClick={() => {
                                setShowModal(true);
                                props.handleSelectedProfile("");
                            }}
                        >
                            Select another image
                        </p>
 
                    </>  
                }
            </div>
            <div>
                <MainNextButton btnName='Next' disabled={props.profileSrc  ? false : true}/>
                <p 
                    onClick={() => {
                        setOnboardingStep("9");
                        setUserOnboarding(getOnboardingStepNumeric());
                    }} 
                    className='cursor-pointer font-bold text-center mt-6 text-sm text-[#8e8e8f]'
                >
                    Skip
                </p>
            </div>
        </section>
        {showModalValue && (
            <ModalAvatarSelection
                handleSrc={props.handleSelectedProfile}
                handleFetch={props.handleNftPayload}
            />
        ) }
        </>
    )
}

export default AvatarSelectionPage