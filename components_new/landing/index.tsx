// @flow 
import * as React from 'react';
import styles from '../../styles/templates'
type Props = {
    
};
export const Landing = (props: Props) => {
    return (
        <div className="flex flex-col mx-auto mt-8 max-w-4xl h-[250px] w-fill justify-center bg-contain" style={{backgroundImage: "url(./background-decoration.svg)"}}>
            {/* <h1 className={[styles.Header, styles.Landing.h1].join(' ')}>
                ANS
            </h1> */}
            <h1 className='font-semibold font-inter  mx-auto text-[72px]'>ANS</h1>
            <h4 className={"font-semibold font-itner mx-auto text-[18px]"}>
                The Arweave Names Service
            </h4>
        </div>
    );
};