import { BookOpenIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAns } from 'ans-for-all';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi';
import Favicon from '../../public/favicon.ico';
import { Divider } from '../user/components/reusables';
import { User } from '../user/sidebar/user';
import { NavUser } from './NavUser';




function BarMenuItem() {
  const [toggle, setToggle] = useState(false);
  const {
    walletConnected,
    ansData,
    arconnectConnect,
    arconnectDisconnect
  } = useAns();
  
  return (
    <div className='dropdown'>
        <button  onClick={() => setToggle(!toggle)}>
            <NavUser />
        </button>
        <article className='relative'>
            {
                toggle && (
                    <div className='dropdown-content bg-white text-black absolute z-50 py-5 px-2 right-1 shadow-xl 
                        rounded-xl mt-4 w-[272px] '>
                        <ul tabIndex={0} className='h-full'>
                            <li className='py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg'>
                                <Link href={"https://www.decent.land/"}  className="flex flex-row items-center ">
                                    <a target="_blank" rel="noopener noreferrer" className=' flex flex-row items-center space-x-3.5'>
                                        <Image src={Favicon} width={27} height={27} className='' alt="" />
                                        <h1>Go to Decent land</h1>
                                    </a>
                                </Link>
                            </li>
                            <Divider />
                            <li className='py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg'>
                                <div className='flex flex-row items-center space-x-3.5'>
                                    <BookOpenIcon height={20} width={20} color="black"/>
                                    <h1>Documentation</h1>
                                </div>
                            </li>
                            <li className='py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg'>
                                <div className='flex flex-row items-center space-x-3.5'>
                                <MoonIcon height={20} width={20} color="black"/>
                                    <h1>Dark Mode</h1>
                                </div>
                            </li>
                            <Divider />
                            <li className='py-2 px-2 w-full hover:bg-gray-200 h-full rounded-lg'>
                                <div onClick={arconnectConnect} className="flex flex-row items-center space-x-3.5">
                                    <FiLogIn height={20} width={20} color="black"/>
                                    <h1>Connect Wallet</h1>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }
        </article>
    </div>
  )
}

export default BarMenuItem