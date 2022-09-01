// @flow 
import * as React from 'react';
import { Nfts } from './nfts';
import { userInfo } from '../../../src/types';

export const Collectibles = (props: userInfo) => {

    return (
        <div className="flex flex-wrap mb-8 w-full ">
            <Nfts userInfo={props.userInfo} />
        </div>
    );
};