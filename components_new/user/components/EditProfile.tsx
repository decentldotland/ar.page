import React, { useState } from 'react'
import {PencilIcon} from '@heroicons/react/24/solid'
import { editModalState, isEditorOpen, userInfoState } from '../../../atoms'
import { userInfo } from '../../../src/types';
import { useRecoilState } from 'recoil';


interface EditProps { 
  user: userInfo 
}

function EditProfile({user}: EditProps) {
  // const [modal, showModal] = useRecoilState(editModalState);
  // This is the original EDITOR MODEL
  const [modal, showModal] = useRecoilState(isEditorOpen);
  // const [currUserInfo, setUserInfo] = useRecoilState(userInfoState);
  console.log(modal)
  return (
    <div 
      onClick={() => {
        // setUserInfo(user)
        showModal(true);
      }}
      className='flex cursor-pointer
      active:scale-95
      hover:bg-gray-300
        rounded-lg  px-2 py-1.5
        bg-base-200 text-base space-x-2 z-50
        flex-row items-center font-inter font-semibold text-[#666]'>
        <PencilIcon height={14} width={14} color={"#666"} strokeWidth={2} />
        <h3 className="text-xs">
            Edit Profile
        </h3>
    </div>
  )
}

export default EditProfile