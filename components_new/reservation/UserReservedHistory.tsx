import { ArrowTopRightOnSquareIcon, ClipboardDocumentCheckIcon

} from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'
import { Divider } from '../user/components/reusables'

interface Props { 
  label: string, 
  address: string 
  timestamp: number
}

function UserReservedHistory({label, address, timestamp}: Props) {
  const shortenName = (addr: string) => {
    if (addr.length > 5) {
      return addr.substring(0, 4) + '...'
    }
    return addr
  }
  const shortenAddress = (addr: string) => {
    if (addr) {
      return addr.substring(0, 2) + '...' + addr.substring(addr.length - 4)
    }
    return addr
  }

  const epochToDate = (epoch: number) => {
    return (new Date(epoch)).toLocaleString();
  }
  return (
      

      <div className='mt-6 bg-[#edecec] px-3 py-1 h-[71px] rounded-xl flex w-fit sm:items-center justify-center'>
        <div className='flex flex-row items-center space-x-5'>
          
          <div className='flex flex-col'>
            <h1 className='text-2xs text-[#656565]'>{epochToDate(timestamp)}</h1>
            <div className='flex flex-row space-x-1 text-left text-sm font-bold items-center'>
              <ClipboardDocumentCheckIcon height={24} width={24} color={`#666`} strokeWidth={2} />
              <p>Reserved</p>
            </div>
          </div>

          <div className='flex flex-col '>
            <h1 className='text-2xs text-[#656565] text-left'>Reserved Name</h1>
            <p className='text-center'>{shortenName(label)}</p>
          </div>

          <div className='flex flex-col text-center'> 
            <h1 className='text-2xs text-[#656565] '>To</h1>
            <p className='text-center'>{shortenAddress(address)}</p>
          </div>

          <ArrowTopRightOnSquareIcon 
                height={20} 
                width={20} 
                color={`#666`} 
                strokeWidth={2} />
        </div>
      </div>

  )
}

export default UserReservedHistory