import React from 'react'
import {PaperClipIcon} from '@heroicons/react/24/solid'
function ChangeCover() {
  return (
    <div className='flex
        rounded-lg  p-2 w-[156px] h-[36px]
        bg-base-200 text-base space-x-2
       flex-row items-center font-inter font-semibold text-[#666]'>
        <PaperClipIcon height={20} width={20} color={"#666"} strokeWidth={2} />
        <h3 className="">
            Change Cover
        </h3>
    </div>
  )
}

export default ChangeCover