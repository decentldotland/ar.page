import React from 'react'
import {PencilIcon} from '@heroicons/react/24/solid'
function EditProfile() {
  return (
    <div className='flex
        rounded-lg  px-4 py-1.5
        bg-base-200 text-base space-x-2
        flex-row items-center font-inter font-semibold text-[#666]'>
        <PencilIcon height={14} width={14} color={"#666"} strokeWidth={2} />
        <h3 className="">
            Edit Profile
        </h3>
    </div>
  )
}

export default EditProfile