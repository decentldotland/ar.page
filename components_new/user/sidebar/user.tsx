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
        <div className="">
            <>
                {(walletConnected && (
                    <div className={`flex flex-row `}>
                        {ansData && (ansData.avatar || ansData.currentLabel || ansData.address_color ) ? (
                            <>
                                {/* name and labels */}
                                <div className="space-x-3.5 flex flex-row items-center">
                                    <Avatar ansData={ansData} />
                                    {/* nickname and label */}
                                    <div className="flex flex-col relative top-[0.5] ">
                                        <p className="text-base font-semibold text-left">
                                            {ansData?.currentLabel}.ar
                                        </p>
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