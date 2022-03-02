// @flow 
import * as React from 'react';
import { Nav } from './nav';
import styles from '../styles/Layout.module.css'
import { Personal } from './personal';
import Head from 'next/head';

type Props = {
    children: any;
};
export const Layout = (props: Props) => {
    return (
        <div className="container mx-auto max-w-screen-lg flex">
            <div className="w-full mx-auto">
                {props.children}
            </div>
        </div>
        // </>
    );
};


//  {/* <Nav className="col-span-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 rounded-3xl drop-shadow-lg" /> */}
//
//