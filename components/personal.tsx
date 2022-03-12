// @flow 
import * as React from 'react';
type Props = {
    children?: any;
    className: string;
    userInfo: any;
};
export const Personal = (props: Props) => {
    return (
        <div className={props.className}>
            <div className="flex flex-wrap lg:grid lg:grid-cols-3 lg:grid-rows-2 w-full lg:-ml-10 my-2  pt-2 text-sviolet shrink-0">

                <div className="w-full col-span-3 row-span-1 lg:col-span-1 lg:row-span-2 grid grid-cols-1 mx-5 my-4 lg:my-0 lg:mb-4 rounded-xl lg:pb-0">
                    {(props.userInfo.avatar.length <= 0) ?
                        <div className="mx-auto rounded-full h-32 w-32" style={{backgroundColor: props.userInfo.address_color}}></div> : 
                    <img className="mx-auto bg-black rounded-full" src={`https://arweave.net/${props.userInfo.avatar}`} />}
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
                                {`${owned.label}`}
                            </h1>
                        )
                    }
                </div> : <></>}

                <div className="w-full col-span-2 row-span-1">
                    <h1 className="text-xl mx-auto font-extrabold text-sviolet underline">User:</h1>
                    <a href={`https://viewblock.io/arweave/address/${props.userInfo.user}`} className="text-lg text-white mx-auto break-words text-center underline">{props.userInfo.user}</a>
                </div>

                {/* <div className="hidden xl:grid w-full h-16 lg:w-auto col-span-3 row-span-1 lg:ml-24 text-center mt-5 lg:mt-0 rounded-xl border-2 bg-back overflow-hidden">
                    <div className=" overflow-y-scroll hideScroll">
                        <h1 className="text-xl mx-auto font-extrabold text-sviolet underline">Bio:</h1>
                        <h1 className="text-xl mx-auto text-white">{props.userInfo.bio}</h1>
                    </div>
                </div> */}

                {/* <div className="w-full overflow-hidden lg:w-1/4">
                </div>

                <div className="w-full overflow-hidden lg:w-1/4">
                </div>

                <div className="w-full overflow-hidden lg:w-1/4">
                </div> */}

            </div>
        </div>
    );
};