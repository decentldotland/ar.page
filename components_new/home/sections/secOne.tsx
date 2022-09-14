// @flow 
import Link from 'next/link';
import * as React from 'react';
import styles from '../../../styles/templates'
import { Button } from '../../buttons';
type Props = {

};
export const SectionOne = (props: Props) => {

    return (
        <div className="flex flex-col md:flex-row md:flex-nowrap flex-wrap mx-auto mt-8 max-w-4xl gap-x-8">
            <div className="flex flex-col w-full md:w-2/3 mb-16">
                <h3 className={[styles.Header, styles.Section.h3, "w-full"].join(' ')}>
                    What is ANS?
                </h3>
                <h6 className={[styles.Section.h6, "w-full mb-12"].join(' ')}>
                    Arweave Names Service combines a decentralized domains naming service and a decentralized Gravatar-like protocol into a new protocol called ANS. Learn more about ANS.
                </h6>
                <h3 className={[styles.Header, styles.Section.h3, "w-full"].join(' ')}>
                    What is ar.page?
                </h3>
                <h6 className={[styles.Section.h6, "w-full"].join(' ')}>
                    ar.page is a web app that renders your ANS metadata in a page displaying your profile&apos;s data, and aggregates a feed of your activities over the Arweave network (Ardrive, Koii, Permacast, etc).
                </h6>
            </div>
            <div className="flex flex-row flex-wrap mx-auto md:w-1/3 justify-center h-48 -mt-12 md:mt-4">
                <div className="relative w-full md:block flex">
                    {
                        [["xy", 32, 28], ["letey", 150, 168],
                        ["arweavesam", 120, 58], ["caoyin", 45, 88],
                        ["martonlederer", 125, 118], ["msfew", 24, 148]].map((data: (string | number)[], i: number) =>
                            <div className="absolute" style={{ left: `${data[1] as string}px`, top: `${data[2] as string}px` }} key={i}>
                                <Link href={`/p/${data[0] as string}#top`} scroll={true}>
                                    <a><Button text={data[0] as string} selected={true} /></a>
                                </Link>
                            </div>)
                    }

                </div>
            </div>
        </div>
    );
};