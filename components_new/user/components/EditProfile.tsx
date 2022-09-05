import React from 'react'
import {PencilIcon} from '@heroicons/react/24/solid'
function EditProfile() {
  return (
    <div className='flex
        rounded-lg  p-2 w-[134px] h-[36px]
        bg-base-200 text-base space-x-2
        flex-row items-center font-inter font-semibold text-[#666]'>
        <PencilIcon height={20} width={20} color={"#666"} strokeWidth={2} />
        <h3 className="">
            Edit Profile
        </h3>
    </div>
  )
}

export default EditProfile