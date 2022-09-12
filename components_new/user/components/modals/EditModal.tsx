import React, { useState } from 'react'
import Box from '@mui/material/Box';
import MuiModal from '@mui/material/Modal'
import { editModalState, userInfoState } from '../../../../atoms'
import { userInfo } from '../../../../src/types';
import { useRecoilState } from 'recoil';
import {PencilIcon, XMarkIcon} from '@heroicons/react/24/solid'
import { Divider } from '../reusables';
import { useAns } from 'ans-for-all';
import Avatar from '../../../avatar';


function EditModal() {
  const [showModal, setShowModal] = useRecoilState(editModalState);
  const [currUserInfo, setUserInfo] = useRecoilState(userInfoState);
  

 // console.log(currUserInfo)
  //console.log(showModal)

  const handleClose = () => { 
    setShowModal(false)
  }

  const {
    walletConnected,
    ansData,
    address,
    arconnectConnect,
    arconnectDisconnect,
    shortenAddress,
  } = useAns();

  // const [avatarState, setAvatarState] = useState<any>(""), //💨🍃
  //       [bioState, setBioState] = useState(""),
  //       [nicknameState, setNicknameState] = useState(""),
  //       [githubState, setGithubState] = useState(""),
  //       [twitterState, setTwitterState] = useState(""),
  //       [instagramState, setInstagramState] = useState(""),
  //       [customUrlState, setCustomUrlState] = useState(""),
  //       [percent, setPercent] = useState(0);
//

  return (
    <MuiModal 
        open={showModal} 
        onClose={handleClose}
        className="fixes  left-0 right-0 !mt-24
        z-50 mx-auto w-full max-w-3xl h-full
        overflow-hidden overflow-y-scroll 
        scrollbar-hide relative font-inter
      "    
    >
            <>
                <section className='bg-white h-[825px] rounded-xl px-11 py-10 '>
                    <div className='flex flex-row justify-between'>
                        <h1 className='font-semibold text-xl text-left'>Customise Profile</h1>
                        <button onClick={handleClose}>
                            <XMarkIcon height={20} width={20} color="#666" />
                        </button>
                    </div>
                    <div className='relative bottom-2'>
                        <Divider />
                    </div>

                    <article className="relative w-full flex items-center justify-center">
                      <div className='relative'>
                        <Avatar ansData={ansData} options={{height:"128px", width:"128px"}}/>
                        <div className='bg-base-300 w-[33px] h-[33px] absolute bottom-1 left-24 rounded-full items-center flex flex-row justify-center'>
                          <PencilIcon height={14} width={14} color={"#666"} strokeWidth={2}  />
                        </div>
                      </div>
                    </article>

                    <div className='mt-5'>
                      <ul className='space-y-7'>
                        <li>
                          <div className='space-y-2'>
                            <h1 className='font-semibold text-sm text-left text-gray-400'>Nickname</h1>
                              <input type="text" placeholder='' className='w-full border border-b border-x-0 border-t-0  outline-none'/>  
                            </div>
                        </li>
                        <li>
                          <div className='space-y-2'>
                            <h1 className='font-semibold text-sm text-left text-gray-400'>Bio</h1>
                              <div className='flex justify-between  border border-b border-x-0 border-t-0 space-x-5'>
                                <input type="text" placeholder='' className='w-full text-lg outline-none'/>  
                                {/* Bio Counter here */}
                                <h2 className='text-xs text-[#c4c4c4] font-medium  '>100/100</h2>
                              </div>
                            </div>
                        </li>
                        <li>
                          <div className='space-y-2'>
                            <h1 className='font-semibold text-sm text-left text-gray-400'>Twitter</h1>
                              <input type="text" placeholder='' className='w-full border text-lg border-b border-x-0 border-t-0  outline-none'/>  
                            </div>
                        </li>
                        <li>
                          <div className='space-y-2'>
                            <h1 className='font-semibold text-sm text-left text-gray-400'>Github</h1>
                              <input type="text" placeholder='' className='w-full text-lg  border border-b border-x-0 border-t-0  outline-none'/>  
                            </div>
                        </li>
                        <li>
                          <div className='space-y-2'>
                            <h1 className='font-semibold text-sm text-left text-gray-400'>Instagram</h1>
                              <input type="text" placeholder='' className='w-full text-lg border border-b border-x-0 border-t-0  outline-none'/>  
                            </div>
                        </li>
                        <li>
                          <div className='space-y-2'>
                            <h1 className='font-semibold text-sm text-left text-gray-400'>Website</h1>
                              <input type="text" placeholder='' className='w-full text-lg border border-b border-x-0 border-t-0  outline-none'/>  
                            </div>
                        </li>
                      </ul>
                    </div>
                </section>
            </>
    </MuiModal>
  )
}

export default EditModal