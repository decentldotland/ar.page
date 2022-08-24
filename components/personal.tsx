// @flow 

import * as React from 'react';
import Image from 'next/image';
import Tippy from '@tippyjs/react';
import { Fab } from './editor/fab';
import { EditModal } from './editor/editmodal';
import Header from './arconnect/arconnect_loader'; //@ts-ignore
// import ReactRoundedImage from "react-rounded-image";
import { createGlobalStyle } from 'styled-components';

type Props = {
    children?: any;
    className: string;
    userInfo: any;
};
export const Personal = (props: Props) => {

    const [color, setColor] = React.useState<string>('theme(\'colors.back\')')

    const GlobalStyles = createGlobalStyle`
        .avatarRing:hover {
            border-color: ${props.userInfo.address_color};
        }
    `;

    return (
        <div className={props.className}>
            <GlobalStyles />
            <div className="flex flex-wrap lg:grid lg:grid-cols-6 lg:grid-rows-3 w-full my-2 lg:p-4 p-8 mb-8 text-sviolet gap-y-4 items-end relative">
                <div className="w-full col-span-3 row-span-1 lg:col-span-2 lg:row-span-3 grid grid-cols-1 my-0 lg:mb-10">
                    {(props.userInfo.avatar.length <= 0) ?
                        <div className="mx-auto rounded-full h-32 w-32 mb-2" style={{ backgroundColor: props.userInfo.address_color }}></div> :
                        // <img className="mx-auto bg-black rounded-full" src={`https://pz-prepnb.meson.network/${props.userInfo.avatar}`} />}
                        <div className="mx-auto rounded-full h-32 w-32 overflow-hidden mb-2 relative border-4 border-back avatarRing">
                            <Image src={`https://pz-prepnb.meson.network/${props.userInfo.avatar}`} alt="Profile Image" layout="fill" objectFit="cover" />

                        </div>
                    }
                    <h1 className="lg:text-xl text-3xl text-white mx-auto font-extrabold">{props.userInfo.currentLabel}</h1>
                    {/* <!-- Column Content --> */}
                </div>

                <div className="w-full lg:col-span-2 lg:row-span-1">
                    <h1 className="text-xl mx-auto text-sviolet font-extrabold">Nickname</h1>
                    <h1 className="text-lg mx-auto  text-white">{props.userInfo.nickname}</h1>
                </div>

                <div className="lg:truncate w-full lg:col-span-2 lg:row-span-1">
                    <h1 className="text-xl mx-auto font-extrabold text-sviolet">Address</h1>
                    <a href={`https://v2.viewblock.io/arweave/address/${props.userInfo.user}`} className="text-lg text-white mx-auto text-center flex w-min float-left">

                        {/* {props.userInfo.user} */}
                        <svg id="Layer_1" className="h-[1.125rem] mt-1 mr-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.06 133.06"><defs>
                            <style>{`.cls-1{fill:white;}.cls-2{fill:none;stroke:white;stroke-miterlimit:10;stroke-width:9.65px;}`}</style>
                        </defs><title>ⓐ_logo</title><path className="cls-1" d="M77.61,91.53a10.57,10.57,0,0,1-.78-2.11,24.72,24.72,0,0,1-.55-2.52,16.49,16.49,0,0,1-2.43,2.15,16.79,16.79,0,0,1-3,1.77A18.35,18.35,0,0,1,67.11,92a20.55,20.55,0,0,1-4.35.44,21.44,21.44,0,0,1-7-1.1,16.56,16.56,0,0,1-5.47-3.08,13.73,13.73,0,0,1-4.86-10.63q0-7.83,5.84-12.11t17.44-4.29h7.1V58.31a7.2,7.2,0,0,0-2.34-5.66c-1.55-1.39-3.8-2.08-6.73-2.08-2.6,0-4.49.55-5.68,1.67a5.79,5.79,0,0,0-1.79,4.47H46.54a13.49,13.49,0,0,1,1.4-6,14.64,14.64,0,0,1,4.08-5,20.29,20.29,0,0,1,6.55-3.41A28.57,28.57,0,0,1,67.43,41a30.64,30.64,0,0,1,8.37,1.1,20.08,20.08,0,0,1,6.71,3.26A14.9,14.9,0,0,1,87,50.82a17,17,0,0,1,1.61,7.58V79.66a36.34,36.34,0,0,0,.5,6.6,17,17,0,0,0,1.47,4.49v.78ZM65.46,82.59A13.55,13.55,0,0,0,69,82.14a14.05,14.05,0,0,0,3-1.2,10.24,10.24,0,0,0,2.29-1.67,8.79,8.79,0,0,0,1.51-1.9V68.85H69.31a19.66,19.66,0,0,0-5.08.57A9.81,9.81,0,0,0,60.79,71a6.43,6.43,0,0,0-2,2.48,7.6,7.6,0,0,0-.64,3.14A5.58,5.58,0,0,0,60,80.9Q61.81,82.6,65.46,82.59Z" transform="translate(-0.79 -1.52)" /><circle className="cls-2" cx="66.53" cy="66.53" r="61.7" /></svg>
                        {/* <h1 className="underline">Wallet</h1> */}
                        <h1 className="underline font-extrabold text-md">Wallet</h1>
                    </a>
                </div>

                {props.userInfo.ownedLabels && props.userInfo.ownedLabels.length > 0 ? <div className="w-full lg:col-span-4 lg:row-span-1 h-[3.5em]">
                    <h1 className="text-xl mx-auto font-extrabold text-sviolet">Labels</h1>
                    {/* <div className=" hideScroll "> */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0 h-[3.5em] hideScroll overflow-y-auto w-full lg:pr-0 pr-16">
                        {
                            props.userInfo.ownedLabels.map((owned: { label: string; scarcity: string; acquisationBlock: number; mintedFor: number; }) =>
                                <div key={owned.acquisationBlock} className="col-span-2 pt-1 w-min  float-left">
                                    <Tippy arrow={true}
                                        key={owned.acquisationBlock}
                                        content={`Scarcity: ${owned.scarcity} `}
                                        className="font-mono font-extrabold text-lg py-0.5">
                                        <h1 className="text-lg text-white w-min float-left">
                                            {`${owned.label}.ar`}
                                        </h1>
                                    </Tippy>
                                </div>
                            )
                        }
                    </div>
                    {/* </div> */}
                </div> : <h1 className="text-lg text-white float-left mx-2">-</h1>}

                {/* <div className="hidden xl:grid w-full h-16 lg:w-auto col-span-3 row-span-1 lg:ml-24 text-center mt-5 lg:mt-0 rounded-xl border-2 bg-back overflow-hidden">
                    <div className=" overflow-y-scroll hideScroll">
                        <h1 className="text-xl mx-auto font-extrabold text-sviolet">Bio:</h1>
                        <h1 className="text-xl mx-auto text-white">{props.userInfo.bio}</h1>
                    </div>
                </div> */}

                {/* <div className="w-full overflow-hidden lg:w-1/4">
                </div>

                <div className="w-full overflow-hidden lg:w-1/4">
                </div>

                <div className="w-full overflow-hidden lg:w-1/4">
                </div> */}

                <EditModal userColor={props.userInfo.address_color} wallet={props.userInfo.user} userInfo={props.userInfo} />

                <Tippy arrow={true}
                    content="connect ArConnect to verify and edit profile."
                    className="font-mono font-extrabold text-lg py-0.5">
                    <a className="absolute bottom-[unset] right-3 top-3">
                        <Header />
                    </a>
                </Tippy>
            </div>
        </div>
    );
};