// @flow 
import React, { useState } from 'react';
import { Nav } from '../../components_new/nav';
type Props = {
    children: JSX.Element;

};
export const Layout = (props: Props) => {

    const [isDark, setIsDark] = useState(false);

    const toggleDark = () => {
        setIsDark(!isDark);
    }

    return (
        <div className="flex flex-col flex-wrap font-mono w-full h-screen" data-theme={isDark ? "ardark" : "arlight"}>
            <Nav toggleDark={toggleDark} />
            <div className="h-body grow md:overflow-y-auto overflow-y-scroll">
            <div id="top"className="h-0 w-0"></div>
            {props.children}
            </div>
        </div>
    );
};

