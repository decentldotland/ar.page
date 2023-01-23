// @flow 
import * as React from 'react';
import { useAns } from 'ans-for-all';
import { Items } from './items';
import { User } from './user';

export const Sidebar = (props: any) => {
    return (
        <div className="flex flex-col justify-between h-body px-auto">
            <Items />
            <User />
        </div>
    );
};