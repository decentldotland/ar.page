// @flow 
import * as React from 'react';
import { NavButtons } from './buttons';
type Props = {
    
};
export const Nav = (props: Props) => {
    return (
        <div className="bg-white flex flex-row justify-end h-[56px] w-full drop-shadow-xl">
            <NavButtons />
        </div>
    );
};