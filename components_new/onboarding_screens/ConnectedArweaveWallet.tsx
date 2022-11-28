import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

function ConnectedArweaveWallet() {


  return (
    <div className='flex items-center space-x-2 hover:rounded-lg'>
        <div className='w-[32px] h-[32px] items-center flex justify-center rounded-lg bg-black'>
            <Image src={'/icons/ARWEAVE_WHITE.svg'}  quality={80} height={22} width={22}/>
        </div>
        <div>
            <p className="text-xs text-left ext-[#8e8e8f]">Linking Accounts to:</p>
            <div className='flex items-center'>
                <h1 className='font-semibold text-left text-sm'>
                    asda...asdasdasd
                </h1>
                <ChevronDownIcon height={15} width={20} strokeWidth={4} className="relative left-3"  />
            </div>
        </div>
    </div>
  )
}

export default ConnectedArweaveWallet