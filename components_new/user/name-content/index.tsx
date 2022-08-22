// @flow 
import * as React from 'react';
import { Labels } from './labels';
import { Panel } from './panel';
import { UserInfo } from './userInfo';
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
    };
};

export const NameContent = (props: Props) => {

    return (
        <div className="h-[36px] w-full my-4 ">
            <div className="flex flex-wrap mx-10 max-w-full rounded-lg">
                <UserInfo userInfo={props.userInfo} />
                <Labels userInfo={props.userInfo} />
                <Panel userInfo={props.userInfo} />
                {/* <div className="h-0 w-full -mx-10"></div> */}
            </div>
        </div>
    );
};