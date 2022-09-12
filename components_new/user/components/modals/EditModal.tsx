import React from 'react'
import Box from '@mui/material/Box';
import MuiModal from '@mui/material/Modal'
import { editModalState, userInfoState } from '../../../../atoms'
import { userInfo } from '../../../../src/types';
import { useRecoilState } from 'recoil';

function EditModal() {
  const [showModal, setShowModal] = useRecoilState(editModalState);
  const [currUserInfo, setUserInfo] = useRecoilState(userInfoState);
  

    console.log(showModal)

  const handleClose = () => { 
    setShowModal(false)
  }

  return (
    <MuiModal 
        open={showModal} 
        onClose={handleClose}
        className="fixes  left-0 right-0 !mt-44 
        z-50 mx-auto w-full max-w-3xl h-full
        overflow-hidden overflow-y-scroll 
        scrollbar-hide relative
      "    
    >
            <>
                <section className='bg-white h-[674px] rounded-xl'>
                    
                </section>
            </>
    </MuiModal>
  )
}

export default EditModal