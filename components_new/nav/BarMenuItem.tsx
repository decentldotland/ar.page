import { BookOpenIcon, CheckBadgeIcon, FaceSmileIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useAns } from 'ans-for-all';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../atoms';
import Favicon from '../../public/favicon.ico';
import Avatar from '../avatar';
import { Divider } from '../user/components/reusables';
import { User } from '../user/sidebar/user';
import { NavUser } from './NavUser';
import {SunIcon} from '@heroicons/react/24/outline'
import { CircularProgress } from '@mui/material';
import { resolveDomain } from '../../src/utils';
import SearchBar from './SearchBar';
import {Bars3Icon}  from '@heroicons/react/24/solid'


function BarMenuItem() {
  const [toggle, setToggle] = useState(false);
  const {
    walletConnected,
    ansData,
    arconnectConnect,
    arconnectDisconnect,
    shortenAddress,
  } = useAns();
  
  const [isDark, setIsDark] = useRecoilState(isDarkMode);
  const toggleDark = () => {
    if (isDark) {
        localStorage.theme = 'arlight';
    } else {
        localStorage.theme = 'ardark';
    }
    setIsDark(!isDark);
}

const container: any = React.useRef();

useEffect(() => {
    const ev = (event: any) => {
        if (!container.current.contains(event.target)) {
            setToggle(false);
            document.removeEventListener('click', ev);
        }
    }
    if (toggle)
        document.addEventListener('click', ev);
    else
        document.removeEventListener('click', ev);
}, [toggle]);

useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'ardark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true)
    } else {
      setIsDark(false)
    }
}, [isDark]);
  return (
    <section className=''  ref={container}>
        <button  onClick={() => setToggle(!toggle)} className="items-center">
            <NavUser />
            {/* <Bars3Icon height={30} width={30} strokeWidth={2}/> */}
        </button>

        <article className={`sm:relative flex flex-row-reverse`} >
            {
                toggle && (
                    // Controls the body of dropdown menu
                    <div hidden={!toggle}
                        className={` ${isDark ? ('bg-[#121a2f]'):('bg-white ')}
                        text-black absolute z-50 -right-0 rounded px-3 py-5 w-screen
                        sm:px-1 sm:right-1 shadow-xl sm:rounded-xl sm:mt-4 sm:w-[272px]`}>
                        <ul className='h-full px-5 sm:px-1 relative left-1'>

                            {/* Search Bar is visible only smaller screens */}
                            <article>
                                <div className='sm:hidden relative bottom-3'>
                                    <Divider />
                                </div>
                                <li className='w-full  relative bottom-2  sm:hidden'>
                                    <SearchBar />
                                </li>
                                <div className='sm:hidden '>
                                    <Divider />
                                </div>
                            </article>
                 

                            {/* Checks if the user is signed -> to show the user avatar or not */}
                            {
                                !walletConnected ? (
                                    <li className={`py-2 px-2 w-full 
                                    ${isDark ? ('hover:bg-[#1a2745] text-white'): ('hover:bg-gray-200')} 
                                    h-full rounded-lg`}>
                                        <Link href={"https://www.decent.land/"}  className="flex flex-row items-center ">
                                            <a target="_blank" rel="noopener noreferrer" className=' flex flex-row items-center space-x-3.5'>
                                                <Image src={Favicon} width={27} height={27} className='' alt="" />
                                                <h1 className={`${isDark ? ('text-white'): ('text-black')} `}>
                                                    Go to decent.land
                                                </h1>
                                            </a>
                                        </Link>
                                    </li>
                                ) : (
                                    <li className={`space-x-3.5 flex flex-row items-center  px-2  py-2
                                    ${isDark ? ('hover:bg-[#1a2745]'): ('hover:bg-gray-200')} h-full rounded-lg`}>
                                        <Avatar ansData={ansData} options={{height:"56px", width:"56px"}}/>
                                        {/* nickname and label */}
                                        <div className="flex flex-col relative top-[0.5] ">
                                            {
                                                ansData ? (
                                                    <p className={`text-lg
                                            
                                                    ${isDark ? ('text-white'): ('text-black')} 
        
                                                    font-semibold text-left`}>
                                                        {ansData?.currentLabel}
                                                    </p>
                                                ): (
                                                    <div className='ml-2'> 
                                                        <CircularProgress color={`${isDark ? ('primary'):('inherit')}`} size={40}/>
                                                    </div>
                                                )
                                            }
                                 
                                        </div>
                                    </li>
                                )
                            }
                            <Divider />
                            <li hidden={!walletConnected} 
                                className={`py-2 px-2 w-full cursor-pointer
                                ${isDark ? ('hover:bg-[#1a2745] text-white'): ('hover:bg-gray-200')} 
                                h-full rounded-lg`}
                            >
                                <a href={resolveDomain(!!ansData?.currentLabel ? ansData.currentLabel: "")}  className=" flex flex-row items-center ">
                                    <div className=' flex flex-row items-center space-x-3.5'>
                                        <FaceSmileIcon height={20} width={20} color={`${isDark? ('white') : ('black') }`}/>
                                        <h1>My Profile</h1>
                                    </div>
                                </a>
                            </li>
                            <li className={`py-2 px-2 w-full 
                                ${isDark ? ('hover:bg-[#1a2745] text-white'): ('hover:bg-gray-200')} 
                                h-full rounded-lg`}>
                                <Link href={"https://docs.decent.land/"}  className="flex flex-row items-center ">
                                    <a target="_blank" rel="noopener noreferrer" className=' flex flex-row items-center space-x-3.5'>
                                    <BookOpenIcon height={20} width={20} color={`${isDark? ('white') : ('black') }`}/>
                                        <h1>Documentation</h1>
                                    </a>
                                </Link>
                            </li>
                            <li className={`py-2 px-2 w-full ${isDark ? ('hover:bg-[#1a2745] text-white'): ('hover:bg-gray-200')}  h-full rounded-lg`}>
                                {/* This is needs to be configured --> Temporarily disabled */}
                                <div onClick={toggleDark} className='cursor-pointer flex flex-row items-center'>{ 
                                    !isDark ? (
                                        <div className='flex flex-row space-x-3.5'>
                                            <MoonIcon height={20} width={20} color={`${isDark? ('white') : ('black') }`}/>
                                            <h1>Dark Mode</h1>
                                        </div>

                                    ):(
                                        <div className='flex flex-row space-x-3.5'>
                                            <SunIcon height={20} width={20} color={`${isDark? ('white') : ('black') }`}/>
                                            <h1>Light Mode</h1>
                                            
                                        </div>
                                    )
                                }
                                </div>
                            </li>
                            <Divider />
                            {
                                walletConnected ? (
                                    <div onClick={() => (arconnectDisconnect as Function)()} 
                                        className={`cursor-pointer py-2 px-2 w-full 
                                        ${isDark ? ('hover:bg-[#1a2745] text-white'): ('hover:bg-gray-200')}
                                        h-full rounded-lg`}
                                    >
                                        <div className="flex flex-row items-center space-x-3.5">
                                        <FiLogOut height={20} width={20} color={`${isDark? ('white') : ('black') }`}/>
                                            <h1>Disconnect Wallet</h1>
                                        </div>
                                    </div>
                                ) : (
                                    <li 
                                    className={`cursor-pointer py-2 px-2 w-full 
                                    ${isDark ? ('hover:bg-[#1a2745] text-white'): ('hover:bg-gray-200')}
                                    h-full rounded-lg`}
                                    >
                                        <div onClick={() => (arconnectConnect as Function)()} className="flex flex-row items-center space-x-3.5">
                                            <FiLogIn height={20} width={20} color={`${isDark? ('white') : ('black') }`}/>
                                            <h1>Connect Wallet</h1>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </article>
    </section>
  )
}

export default BarMenuItem