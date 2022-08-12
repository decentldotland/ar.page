// @flow 
import * as React from 'react';
import { Button } from '../buttons';
import Link from 'next/link'
import { useAns } from 'ans-for-all';
import Sun from '../buttons/sun.svg'
type Props = {
    
};
export const NavButtons = (props: Props) => {

    const {
        walletConnected,
        arconnectConnect,
        arconnectDisconnect,
    } = useAns();

    return (
        <div className="flex flex-row gap-x-[10px] px-[10px] h-full">
            <Link href="/#top" scroll={true}>
                <a className="h-full w-full pt-[14px]">
                <Button onClick={() => {}}  text="Home" />
                </a>
            </Link>
            {/* <Button onClick={() => {}}  text="Names" /> */}

            {(walletConnected && 
            <Button text="Disconnect" className="hover:hidden" onClick={() => (arconnectDisconnect as Function)()} />
            ) || (
            <Button text="Connect" className="hover:hidden" onClick={() => (arconnectConnect as Function)()} />)}

            {/* <Button text={<Sun />} onClick={() => {}}  /> */}
        </div>
    );
};