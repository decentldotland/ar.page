// @flow 
import * as React from 'react';
import { Nfts } from './nfts';
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
export const Collectibles = (props: Props) => {

    return (
        <div className="flex flex-wrap mb-8 w-full ">
            <Nfts userInfo={props.userInfo} />
        </div>
    );
};