// @flow 
import * as React from 'react';
import { useAns } from 'ans-for-all';

type Props = {

};
export const User = (props: Props) => {

    const {
        walletConnected,
        ansData,
        arconnectConnect,
    } = useAns();

    React.useEffect(() => {
        console.log("walletConnected", walletConnected)
    }, [walletConnected]);

    return (
        <div className="h-[36px]">
            <>
                {(walletConnected && (
                    <div className="flex flex-row gap-x-2.5">
                        {(ansData?.avatar === "") ?
                            <div className="flex rounded-full h-[26px] w-[26px] overflow-hidden ml-2 btn-secondary border-[2px] mt-[4px]" style={{ backgroundColor: ansData?.address_color, border: `2px solid ${ansData?.address_color}` }}></div> :
                            <div className="flex rounded-full h-[26px] w-[26px] overflow-hidden ml-2 btn-secondary border-[2px] mt-[4px]" style={{ backgroundColor: ansData?.address_color, border: `2px solid ${ansData?.address_color}` }}>
                                <img src={`https://pz-prepnb.meson.network/${ansData?.avatar}`} alt="Profile" width="100%" height="100%" />
                            </div>}

                        {/* nickname and label */}
                        <div className="flex flex-col mt-1">
                            <div className="text-xs font-medium">
                                {ansData?.currentLabel}
                            </div>
                            <div className=" text-[#656] text-[10px] font-normal">
                                {ansData?.currentLabel}.ar
                            </div>
                        </div>
                    </div>
                )) || (
                        <div className="flex flex-row gap-x-2.5">
                            <div
                                className='flex rounded-full h-[26px] w-[26px] overflow-hidden ml-2 btn-secondary border-[2px] mt-[4px]'
                                onClick={arconnectConnect}
                            >
                                <img className='h-[24px] w-[24px] mx-auto my-auto' src="https://nanofuxion.ar.page/favicon.png"></img>
                            </div>

                            {/* nickname and label */}
                            <div className="flex flex-col mt-1">
                                <div className="text-xs font-medium">
                                    Connected wallet.
                                </div>
                                <div className=" text-[#656] text-[10px] font-normal">
                                    Connected wallet.
                                </div>
                            </div>
                        </div>
                    )}
            </>
        </div>
    );
};