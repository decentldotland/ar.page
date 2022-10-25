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
    <section  className='w-full px-10 cursor-pointer '>
      <div>
        <h1 className='font-semibold text-xl text-left text-[#6a6b6a]'>History</h1>
        <div className='mt-2 rounded-sm h-[1px] w-full bg-[#d9d9d9]'></div>
      </div>

      <div className='mt-6 bg-[#edecec] px-3 py-1 h-[71px] rounded-xl'>
      <table className="w-[386px] ">
        <tbody className='text-2xs  font-normal items-center '>
          <tr className='text-[#656565] '>
            <td>{epochToDate(timestamp)}</td>
            <td className=''>Reserved Name</td>
            <td className='text-center'>For</td>
          </tr>
        </tbody>
        <tbody className='relative top-1 text-[#3a3a3a]'>
          <tr className='text-base font-medium  '>
            <td className='flex flex-row space-x-1 items-center text-center'>
              <ClipboardDocumentCheckIcon 
              height={24} 
                width={24} 
                color={`#666`} 
                strokeWidth={2} />
                <p>Reserved</p>
              </td>
            <td className='relative left-3'>{shortenName(label)}</td>
            <td className='text-center'>{shortenAddress(address)}</td>
            <td className='relative left-3 bottom-1'>
              <ArrowTopRightOnSquareIcon 
                height={24} 
                width={24} 
                color={`#666`} 
                strokeWidth={2} />
            </td>
          </tr>
        </tbody>
      </table>

      </div>
    </section>
  )
}

export default UserReservedHistory