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

    const [openList, setOpenList] = React.useState<boolean>(false);

    return (
        <div className="flex flex-wrap mt-8 w-full">
            <div className="flex flex-row justify-between w-full text-[#656] font-medium text-xs">
                <div className="text-start">
                    Collectibles
                </div>
                <div className="text-end" onClick={() => setOpenList(isOpen => !isOpen)}>
                    {openList ? "Collapse View" : "View all"}
                </div>
            </div>

            <div className="text-black w-full font-normal text-sm h-[600px]">
                <Nfts userInfo={props.userInfo} open={openList} />
            </div>
        </div>
    );
};