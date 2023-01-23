// @flow 
import * as React from 'react';
import { Button } from '../buttons';
import Link from 'next/link'
import { useAns } from 'ans-for-all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';

export const NavButtons = (props: any) => {

    const {
        walletConnected,
        arconnectConnect,
        arconnectDisconnect,
    } = useAns();
    const toggleDark = props.toggleDark;

    return (
        <div className="flex items-center flex-row gap-x-[10px] px-[10px] h-full">
            <Link href="/#top" scroll={true}>
                <a className="flex ">
                <button className="btn-sm-primary" onClick={() => {}}>Home</button>
                </a>
            </Link>
            {/* <Button onClick={() => {}}  text="Names" /> */}

            <div className="flex items-center">
                {(walletConnected && 
                <button className="btn btn-sm btn-secondary btn-outline !text-xs" onClick={() => (arconnectDisconnect as Function)()}>Disconnect</button>
                ) || (
                <button className="btn btn-sm btn-secondary btn-outline !text-xs" onClick={() => (arconnectConnect as Function)()}>Connect</button>)}
            </div>
            <button className="btn btn-sm btn-primary" onClick={toggleDark}>
                <FontAwesomeIcon icon={faSun} className="w-3"/>
            </button>
            {/* <Button text={<Sun />} onClick={() => {}}  /> */}
        </div>
    );
};