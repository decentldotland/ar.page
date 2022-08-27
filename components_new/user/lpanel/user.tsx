import Image from 'next/image';
import * as React from 'react';
import { useAns } from 'ans-for-all';
import Avatar from '../../avatar';
import Favicon from '../../../public/favicon.ico';
import {UserIcon} from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlusSquare, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import {ArrowRightOnRectangleIcon, PlusIcon} from '@heroicons/react/24/outline'



export const User = (props: any) => {
    const {
        walletConnected,
        ansData,
        arconnectConnect,
    } = useAns();

    React.useEffect(() => {
        console.log("walletConnected", walletConnected)
    }, [walletConnected]);

    return (
        <div className="h-9 mx-4 mb-8">
            <>
                {(walletConnected && (
                    <div className={`flex flex-row gap-x-2.5`}>
                        {ansData && (ansData.avatar || ansData.currentLabel || ansData.address_color ) ? (
                            <>
                                <div tabIndex={0} className='dropdown dropdown-top bg-white items-center'>
                                    <ul tabIndex={0} className="dropdown-content menu bg-white
                                    shadow-xl rounded-xl px-4 py-4 text-base items-center mb-5 space-y-6
                                    text-black w-[180px] h-[181px] transition ease-in-out duration-500">
                                        <li className='w-full h-[30px]'>
                                            <div className='btn btn-primary'>
                                                <div className="items-center flex justify-center ml-2 space-x-3.5">
                                                    <PlusIcon height={18} width={18} /> 
                                                    <p>Profile</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='w-full h-[30px]'>
                                            <div className='btn-primary btn'>
                                                <div className="mr-2">
                                                    <FontAwesomeIcon 
                                                        icon={faUser} height={18} width={18} strokeWidth={1} stroke={"true"}/> 
                                                </div>
                                                <p>Profile</p>
                                            </div>
                                        </li>
                                        <li className='w-full h-[30px]'>
                                            <div className='btn-primary btn'>
                                                <ArrowRightOnRectangleIcon  height={18} width={18}/> 
                                                <p>Disconnect</p>
                                            </div>
                                        </li>
                                    </ul>

                                    {/* name and labels */}
                                    <div className="space-x-3 5 flex flex-row items-center">
                                        <Avatar ansData={ansData} />
                                        {/* nickname and label */}
                                        <div className="flex flex-col relative top-[0.5] ">
                                            <p className="text-base font-semibold text-left">
                                                {ansData?.currentLabel}
                                                {/* Hello Text */}
                                            </p>
                                            <p className="text-[#656] text-xs font-normal">
                                                {ansData?.currentLabel}.ar
                                                {/* Hello.ar */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ): (
                            <div className="bg-gray-400/40 px-4 h-full rounded-md animate-pulse">
                                Loading...
                            </div>
                            
                        )}
                    </div>

                )) || (
                        <div className="flex flex-row gap-x-2.5 items-center">
                            <div
                                className='flex rounded-full h-9 w-9 overflow-hidden bg-primary border-[2px] mt-[4px]'
                                onClick={arconnectConnect}
                            >
                                <Image src={Favicon} width={36} height={36} className='mx-auto my-auto' alt="" />
                            </div>

                            {/* nickname and label */}
                            <div className="flex flex-col mt-1 max-w-[80px]">
                                <div className="text-xs font-medium">
                                    No wallet detected...
                                </div>
                            </div>
                        </div>
                    )}
            </>
        </div>
    );
};