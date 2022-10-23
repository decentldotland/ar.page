import { ArrowTopRightOnSquareIcon, DocumentDuplicateIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { useAccount, useDisconnect } from 'wagmi';

interface Props{ 
    displayImg?: string ,
    chainIconUrl?: string, 
    address?: string , 
    walletName?: string
}

export function UserAccountDetails({displayImg, chainIconUrl, address, walletName}: Props) {
    const [toggle, setToggle] = useState(false);
    const shortenAddress = (addr: string) => {
      if (addr) {
        return addr.substring(0, 4) + '...' + addr.substring(addr.length - 4)
      }
      return addr
    }

    const {disconnect, disconnectAsync } = useDisconnect();
    return (
      <section>
        <p className='text-left text-2xs text-[#6a6b6a] mb-1'>Your Connected Wallet</p>
        <div className='bg-[#edecec] rounded-xl w-[276px] h-14 relative items-center flex px-2'>
          <div className='flex space-x-2 items-center flex-row'>
            {/* User Profile Goes Here */}
            {
              displayImg !== undefined ? (
                  <div className='relative mt-1 items-center'>
                    <Image 
                      width={38}
                      height={38}
                      className='rounded-full' 
                      src={displayImg} />
                    <div className='rounded-full absolute bottom-6 left-4
                      bg-[#CECECF] h-6 w-6 border-[#edecec]  border-2'>
                      <Image src={chainIconUrl!} height={16} width={16}/>
                    </div>
                  </div>
              ) : (
                <div className='relative'>
                  <div className='rounded-full bg-[#B3B2B3] h-[38px] w-[38px]'>
                    {/* Chain Icons Goes Here */}
                    <div className='rounded-full relative left-4 bottom-1 
                      bg-[#CECECF] h-6 w-6 border-[#edecec] border-2 '>
                      <Image src={chainIconUrl!} height={16} width={16}/>
                    </div>
                  </div>
                </div>
              )
            }
            <div className='flex flex-col space-y-1'>
              <div className='flex flex-row space-x-2 items-center'>
                <h1 className='font-bold text-xs text-[#666]'>{shortenAddress(address!)}</h1>
                <div className='h-[10px] w-[10px] rounded-full bg-[#1cc16a]'></div>
              </div>
              <h2 className='text-left text-[#b3b2b3] text-xs'>{walletName}</h2>
            </div>
            
          </div>
          <div onClick={() => setToggle(!toggle)} className='absolute right-0 cursor-pointer'>
            <EllipsisVerticalIcon color='#6a6b6a' strokeWidth={2} height={20} width={20} />
          </div> 
        </div>
        {
          toggle && (
            <div className='py-2 mt-3 px-5 h-[124px] w-[276px] bg-[#edecec] rounded-xl shadow-xl absolute z-50'>
              <ul className='space-y-4 '>
                <li>
                  <div onClick={() => disconnect()} className="cursor-pointer flex flex-row items-center space-x-3">
                  <FiLogOut size={20} color={`#666`}  strokeWidth={2} className={'relative ml-1'}/>
                      <h1 className='text-[#666666] font-medium text-left text-base'>Disconnect Wallet</h1>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row items-center space-x-3">
                  <DocumentDuplicateIcon height={24} width={24} color={`#666`}  strokeWidth={1.7}/>
                      <h1 className='text-[#666666] font-medium text-left text-base'>Copy Address</h1>
                  </div>
                </li>
                <li>
                  <div className="flex flex-row items-center space-x-3">
                  <ArrowTopRightOnSquareIcon height={24} width={24} color={`#666`} strokeWidth={2} />
                      <h1 className='text-[#666666] font-medium text-left text-base'>View on Etherscan</h1>
                  </div>
                </li>
              </ul>
            </div>
          )
        }
      </section>
    )
  }
  