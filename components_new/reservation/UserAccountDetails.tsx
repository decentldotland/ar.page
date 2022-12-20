import { ArrowTopRightOnSquareIcon, DocumentDuplicateIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Snackbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { useAccount, useDisconnect } from 'wagmi';

interface Props{ 
    upperMessage: string, 
    displayImg?: string ,
    chainIconUrl?: string, 
    address?: string , 
    walletName?: string
}

export function UserAccountDetails({displayImg, chainIconUrl, address, walletName, upperMessage}: Props) {
  const [open, setOpen] = React.useState(false);
  const copy_text = (link: string) => { 
      setOpen(true);
      navigator.clipboard.writeText(link);
  }  
  const [toggle, setToggle] = useState(false);
    const shortenAddress = (addr: string) => {
      if (addr) {
        return addr.substring(0, 4) + '...' + addr.substring(addr.length - 4)
      }
      return addr
    }

    const container: any = React.useRef();

    useEffect(() => {
    const ev = (event: any) => {
        if (!container.current?.contains(event.target)) {
            setToggle(false);
            document.removeEventListener('click', ev);
        }
    }
    if (toggle)
        document.addEventListener('click', ev);
    else
        document.removeEventListener('click', ev);
    }, [toggle]);

    const {disconnect } = useDisconnect();
    return (
      <section ref={container}>
        <p className='text-left text-xs text-[#6a6b6a] mb-1'>{upperMessage}</p>
        <div className='bg-[#edecec] rounded-xl w-[346px] h-14 relative items-center flex px-2'>
          <div className='flex space-x-2 items-center flex-row'>
            {/* User Profile Goes Here */}
            {
              displayImg !== undefined ? (
                  <div className='relative mt-1 items-center'>
                    <Image 
                      width={38}
                      height={38}
                      className='rounded-full bg-gradient-to-l from-[#9E00FF] to-[#1273EA]' 
                      src={displayImg} />
                    <div className='rounded-full absolute bottom-6 left-4
                      bg-[#CECECF] h-6 w-6 border-[#edecec]  border-2'>

                      {/*  This could be done much better, error seems to persist if the users tries to comeback to the page */}
                      <Image src={chainIconUrl!} height={16} width={16}/>
                    </div>
                  </div>
              ) : (
                  <div className='rounded-full bg-gradient-to-l from-[#9E00FF] to-[#1273EA]  h-[38px] w-[38px]'>
                    {/* Chain Icons Goes Here */}
                    <div className='rounded-full relative left-4 bottom-1 items-center flex justify-center
                      bg-[#CECECF] h-6 w-6 border-[#edecec] border-2 '>
                      <Image src={chainIconUrl!} height={16} width={16}/>
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
                  <div onClick={() =>{ copy_text(address!); }} className="cursor-pointer flex flex-row items-center space-x-3">
                  <DocumentDuplicateIcon height={24} width={24} color={`#666`}  strokeWidth={1.7}/>
                      <h1 className='text-[#666666] font-medium text-left text-base'>Copy Address</h1>
                  </div>
                </li>
                <li>
                  <Link href={`https://etherscan.io/address/${address}/`}  className="flex flex-row items-center ">
                      <a target="_blank" rel="noopener noreferrer" className='flex flex-row items-center space-x-3'>
                      <ArrowTopRightOnSquareIcon height={24} width={24} color={`#666`} strokeWidth={2} />
                          <h1 className='text-[#666666] font-medium text-left text-base'>View on Etherscan</h1>
                      </a>
                  </Link>
                </li>
              </ul>
              <Snackbar
                    message="Copied to clipboard"
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    open={open}
                />
            </div>
          )
        }
      </section>
    )
  }
  