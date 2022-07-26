// @flow 
import * as React from 'react';
import { Nav } from './nav';
// import styles from '../styles/Layout.module.css'
import { Personal } from './personal';
import Head from 'next/head';
import Footer from './footer';
import { useUploadHandler } from '../src/useUploadHandler';

type Props = {
    children: any;
};
export const Layout = (props: Props) => {
    // useUploadHandler();
    return (
        <div className="mx-auto  flex w-full bg-contain bg-no-repeat bg-right relative dark">
            <div className="container w-full xl:mx-auto lg:mx-14 mx-0 max-w-screen-lg my-auto font-mono h-screen lg:overflow- hideScroll0">
                {props.children}
                <Footer />
            </div>
        </div>
    );
};


//  {/* <Nav className="col-span-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 rounded-3xl drop-shadow-lg" /> */}
//
//