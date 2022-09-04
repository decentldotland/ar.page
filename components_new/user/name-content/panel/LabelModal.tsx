import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { labelState, transferModal } from '../../../../atoms';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';



function LabelModal() {
  // On Click - Open up a popup board
  const [showTransferModal, setShowTransferModal] = useRecoilState(transferModal);
  const [currentLabelSelected, showSelectedLabel] = useRecoilState(labelState);
  
  const handleCloseModal  = () => { 
    setShowTransferModal(false)
  }

  console.log(showTransferModal)


  console.log(`${currentLabelSelected} The current label selected`)


  return (
    <Modal
      open={true}
      onClose={handleCloseModal}
    >
      <>
      <div className="bg-black p-3">
        Hello
    
      </div>
      </>
    </Modal>
  )
}

export default LabelModal