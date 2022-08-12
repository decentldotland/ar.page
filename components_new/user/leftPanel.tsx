// @flow 
import * as React from 'react';
import { useAns } from 'ans-for-all';
import { Items } from './lpanel/items';
import { User } from './lpanel/user';

type Props = {
    
};
export const LeftPanel = (props: Props) => {
    return (
        <div className="flex flex-col justify-between h-body px-auto">
            <Items />
            <User />
        </div>
    );
};