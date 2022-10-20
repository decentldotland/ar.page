import Image from 'next/image';
import * as React from 'react';
import { useAns } from 'ans-for-all';
import Favicon from '../../public/favicon.ico';
import {UserIcon} from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlusSquare, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import {ArrowRightOnRectangleIcon, PlusIcon} from '@heroicons/react/24/outline'
import Avatar from '../avatar';
import { Bars3Icon } from '@heroicons/react/24/solid';



export const NavUser = (props: any) => {
    const {
        walletConnected,
        ansData,
        arconnectConnect,
    } = useAns();

    React.useEffect(() => {
        // console.log("walletConnected", walletConnected)
    }, [walletConnected]);

    return (
        <div className="font-inter font-semibold">
            <>
                {(walletConnected && (
                    <div className={`flex flex-row `}>
                        {ansData && (ansData.avatar || ansData.currentLabel || ansData.address_color ) ? (
                            <>
                                {/* name and labels */}
                                <div className="mt-1 flex flex-row items-center bg-base-100 rounded-3xl">
                                    <Avatar ansData={ansData} />
                                </div>
                            </>
                        ): (
                            <div className='flex rounded-full h-9 w-9 overflow-hidden bg-primary border-[2px] mt-[4px]'
                                // onClick={arconnectConnect}
                            >
                                <Image src={Favicon} width={36} height={36} className='mx-auto my-auto' alt="" />
                            </div>
                            )}
                    </div>

                )) || (
                    <div>

                        <div className="flex flex-row gap-x-2.5 items-center hidden sm:block">
                            <div
                                className='flex rounded-full h-9 w-9 justify-center items-center  
                                    md:h-10 md:w-10 overflow-hidden bg-[#242B48] '
                                // onClick={arconnectConnect}
                            >
                                <Image src={Favicon} width={25} height={25} className='mx-auto my-auto' alt="" />
                            </div>

                        </div>
                            <Bars3Icon height={30} width={30} strokeWidth={2} className="sm:hidden"/>
                    </div>
                    )}
            </>
        </div>
    );


    
};