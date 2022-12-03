import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import React from 'react'

interface ConnectedArweaveWalletInterface {
    addressAr: string | undefined;
}

function ConnectedArweaveWallet(props: ConnectedArweaveWalletInterface) {
  return (
    <div className='flex items-center space-x-2 hover:rounded-lg'>
        <div className='w-[32px] h-[32px] items-center flex justify-center rounded-lg bg-black'>
            <Image src={'/icons/ARWEAVE_WHITE.svg'}  quality={80} height={22} width={22} alt="Arweave Logo" />
        </div>
        <div>
            <p className="text-xs text-left ext-[#8e8e8f]">Linking Accounts to:</p>
            <div className='flex items-center'>
                <p className='font-semibold text-left text-sm'>
                    {props.addressAr}
                </p>
                <ChevronDownIcon height={15} width={20} strokeWidth={4} className="relative left-3"  />
            </div>
        </div>
    </div>
  )
}
//asda...asdasdasd
export default ConnectedArweaveWallet