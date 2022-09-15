import React, { useState } from 'react'
import {PencilIcon} from '@heroicons/react/24/solid'
import { editModalState, isDarkMode, isEditorOpen, userInfoState } from '../../../atoms'
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
  
  const [isDark, setIsDark] = useRecoilState(isDarkMode);

  console.log(modal)
  return (
    <div 
      onClick={() => {
        // setUserInfo(user)
        showModal(true);
      }}
      className={`flex cursor-pointer
      active:scale-95 
      ${isDark ? ('hover:bg-[#1a2745]'): ('hover:bg-gray-200')}
        rounded-lg  px-2 py-2
        ${isDark ? ('bg-[#35466e] text-white'): ('bg-gray-200 text-[#666]')}
        space-x-2 z-40
        flex-row items-center font-inter font-semibold 
        `}>
        <PencilIcon height={14} width={14} 
          color={`${isDark? ('white') : ('#666') }`}        
          strokeWidth={2} />
        <h3 className="text-xs hidden md:block">
            Edit Profile
        </h3>
    </div>
  )
}

export default EditProfile