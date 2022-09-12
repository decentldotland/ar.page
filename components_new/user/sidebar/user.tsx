import Image from 'next/image';
import * as React from 'react';
import { useAns } from 'ans-for-all';
import Avatar from '../../avatar';
import Favicon from '../../../public/favicon.ico';
import {UserIcon} from '@heroicons/react/24/outline'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlusSquare, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import {ArrowRightOnRectangleIcon, PlusIcon} from '@heroicons/react/24/outline'
import Link from 'next/link';



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
        <div className="font-inter font-semibold">
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
                            <Link href={"https://www.decent.land/"}  className="flex flex-row  items-center">
                                <a target="_blank" rel="noopener noreferrer" className='space-x-5 hover:opacity-60 flex flex-row items-center '>
                                    <Image src={Favicon} width={36} height={36} className='mx-auto my-auto' alt="" />
                                    <h1>Go to Decent land</h1>
                                </a>
                            </Link>
                        )}
                    </div>

                )) || (
                        <Link href={"https://www.decent.land/"}  className="flex flex-row  items-center ">
                            <a target="_blank" rel="noopener noreferrer" className='space-x-5 hover:opacity-60 flex flex-row items-center '>
                                <Image src={Favicon} width={36} height={36} className='mx-auto my-auto' alt="" />
                                <h1>Go to Decent land</h1>
                            </a>
                        </Link>
                    )}
            </>
        </div>
    );
};