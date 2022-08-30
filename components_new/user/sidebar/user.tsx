import Image from 'next/image';
import * as React from 'react';
import { useAns } from 'ans-for-all';
import Avatar from '../../avatar';
import Favicon from '../../../public/favicon.ico';

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
        <div className="h-9 mx-4 mb-4">
            <>
                {(walletConnected && (
                    <div className="flex flex-row gap-x-2.5">
                        {ansData && (ansData.avatar || ansData.currentLabel || ansData.address_color ) ? (
                            <>
                                <Avatar ansData={ansData} />
                                {/* nickname and label */}
                                <div className="flex flex-col mt-0.5">
                                    <div className="text-sm font-medium">
                                        {ansData?.currentLabel}
                                    </div>
                                    <div className="text-[#656] text-xs font-normal">
                                        {ansData?.currentLabel}.ar
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