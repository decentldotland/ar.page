// @flow 
import * as React from 'react';
import { Button } from '../buttons';
import Link from 'next/link'
import { useAns } from 'ans-for-all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { isDarkMode } from '../../atoms';

import {SunIcon, MoonIcon} from '@heroicons/react/24/solid'
import { useRecoilState } from 'recoil';


export const NavButtons = (props: any) => {

    const {
        walletConnected,
        arconnectConnect,
        arconnectDisconnect,
    } = useAns();
    const [isDark, setIsDark] = useRecoilState(isDarkMode);
    
    const toggleDark = props.toggleDark


        

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
                {
                    isDark ? <MoonIcon height={12} width={12} color="yellow"/> : <FontAwesomeIcon icon={faSun} className="w-3" color='black'/>
                }
            </button>
            {/* <Button text={<Sun />} onClick={() => {}}  /> */}
        </div>
    );
};