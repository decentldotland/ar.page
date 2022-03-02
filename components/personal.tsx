// @flow 
import * as React from 'react';
type Props = {
    children?: any;
    className: string;
    userInfo: any;
    // hasTwtr: number;
};
export const Personal = (props: Props) => {
    return (
        <div className={props.className}>
            <div className="flex flex-wrap lg:grid lg:grid-cols-3 lg:grid-rows-3 w-full lg:-ml-10 text-sviolet">

                <div className="w-full col-span-3 row-span-1 lg:col-span-1 lg:row-span-2 grid grid-cols-1 p-3 m-2 rounded-3xl lg:pb-0">
                    <img className="mx-auto bg-black rounded-full" src={`https://arweave.net/${props.userInfo.avatar}`} />
                    <h1 className="text-3xl text-white mx-auto font-extrabold">{props.userInfo.currentLabel}</h1>
                    {/* <!-- Column Content --> */}
                </div>

                <div className="w-full lg:col-span-1 lg:row-span-1">
                    <h1 className="text-xl mx-auto text-sviolet font-extrabold underline">Nickname:</h1>
                    <h1 className="text-lg mx-auto  text-white">{props.userInfo.nickname}</h1>
                </div>

                {props.userInfo.ownedLabels && props.userInfo.ownedLabels.length > 0 ? <div className="w-full lg:col-span-1 lg:row-span-1">
                    <h1 className="text-xl mx-auto font-extrabold text-sviolet underline">Labels:</h1>
                    {
                        props.userInfo.ownedLabels.map((owned: {label: string; scarcity: string; acquisationBlock: number; mintedFor: number;} ) =>
                            <h1 key={owned.acquisationBlock} className="text-lg mx-auto  text-white">
                                {`${owned.label} - Scarcity: ${owned.scarcity} `}
                            </h1>
                        )
                    }
                </div> : <></>}

                <div className="w-full col-span-2 row-span-1">
                    <h1 className="text-xl mx-auto font-extrabold text-sviolet underline">User:</h1>
                    <a href={`https://viewblock.io/arweave/address/${props.userInfo.user}`} className="text-lg text-white mx-auto">{props.userInfo.user}</a>
                </div>

                <div className="w-full lg:w-auto col-span-3 row-span-1 lg:ml-24 text-center mt-5 rounded-xl border-2">
                    <h1 className="text-xl mx-auto font-extrabold text-sviolet underline">Bio:</h1>
                    <h1 className="text-xl mx-auto text-white">{props.userInfo.bio}</h1>
                </div>

                <div className="w-full overflow-hidden lg:w-1/4">
                    {/* <!-- Column Content --> */}
                </div>

                <div className="w-full overflow-hidden lg:w-1/4">
                    {/* <!-- Column Content --> */}
                </div>

                <div className="w-full overflow-hidden lg:w-1/4">
                    {/* <!-- Column Content --> */}
                </div>

            </div>
        </div>
    );
};