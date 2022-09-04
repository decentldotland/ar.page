// @flow 
import Tippy from '@tippyjs/react';
import * as React from 'react';
import { Button } from '../../buttons';

import {transferModal, labelState} from '../../../atoms'
import { useRecoilState } from 'recoil';

type Props = {
    userInfo: {
        user: string;
        currentLabel: string;
        ownedLabels?: {
            label: string;
            scarcity: string;
            acquisationBlock: number;
            mintedFor: number;
        }[],
        nickname?: string;
        address_color: string;
        bio?: string;
        avatar?: string;
        links?: {
            github?: string;
            twitter?: string;
            customUrl?: string;
            instagram?: string;
        },
        subdomains?: any;
        freeSubdomains: number;
    }
};
export const Labels = (props: Props) => {

    // On Click - Open up a popup board
    const [showTransferModal, setShowTransferModal] = useRecoilState(transferModal);
    const [currentLabelSelected, showSelectedLabel] = useRecoilState(labelState);

    console.log(showTransferModal)
    console.log(currentLabelSelected)

    return (
        <div className="w-full font-inter ">
            {props.userInfo.ownedLabels && props.userInfo.ownedLabels.length > 0 ? <div className="w-full lg:col-span-4 lg:row-span-1 h-[3.5em]">
                {/* <div className=" hideScroll "> */}
                <div className="flex gap-x-4 gap-y-0 h-[3.5em] font-medium">
                    {
                        props.userInfo.ownedLabels.map((owned: { label: string; scarcity: string; acquisationBlock: number; mintedFor: number; }) =>
                        <div
                            key={owned.acquisationBlock} 
                            className="col-span-2 pt-1 float-left select-none ">
                                <Tippy 
                                    arrow={true}
                                    key={owned.acquisationBlock}
                                    content={`scarcity: ${owned.scarcity} `}
                                    className="font-inter text-sm">
                                    <button 
                                        onClick={() => { 
                                            showSelectedLabel(owned);
                                            setShowTransferModal(true);
                                        }} 
                                        className="btn btn-sm btn-primary rounded-xl">
                                        {owned.label}.ar
                                    </button>
                                </Tippy>
                            </div>
                        )
                    }
                </div>
                {/* </div> */}
            </div> : <h1 className="text-lg text-white float-left mx-2">-</h1>}
        </div>
    );
};