import React from 'react'
import {PaperClipIcon} from '@heroicons/react/24/solid'
function ChangeCover() {
  return (
    <div className='flex
    rounded-lg  px-4 py-1.5
    bg-base-200 text-base space-x-2
    flex-row items-center font-inter font-semibold text-[#666]'>
        <PaperClipIcon height={14} width={14} color={"#666"} strokeWidth={2} />
        <h3 className="text-xs">
            Change Cover
        </h3>
    </div>
  )
}

export default ChangeCover