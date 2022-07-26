// @flow 
import * as React from 'react';
import { Nav } from '../../components_new/nav';
type Props = {
    children: JSX.Element;

};
export const Layout = (props: Props) => {


    return (
        <div className="flex flex-col flex-wrap font-mono w-full h-screen bg-[#fafafa] text-black">
            <Nav />
            <div className="h-body grow md:overflow-y-auto overflow-y-scroll">
            <div id="top"className="h-0 w-0"></div>
            {props.children}
            </div>
        </div>
    );
};

