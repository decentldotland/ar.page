import React from 'react'
import MuiModal from '@mui/material/Modal'
import { avatarModalState, userOnboardingState } from '../../atoms';
import { useRecoilState } from 'recoil';
import { Avatar } from '../../components/editor/inputs/avatar';



function ModalAvatarSelection() {
    const [showModal, setShowModal] = useRecoilState(avatarModalState);
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
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-center font-semibold text-3xl'>Select an Avatar</h1>

                    <div className='space-y-3 relative top-[48px]'>
                        <div className={buttonClass}>Add from NFT collections</div>
                        <div className={buttonClass}>Choose from computer</div>
                    </div>

                </div>
            </section>
        </>
    </MuiModal>
  )
}

export default ModalAvatarSelection


const buttonClass = 'cursor-pointer items-center rounded-full bg-[#1273ea] text-white font-semibold py-4 px-11'