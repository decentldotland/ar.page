import axios from 'axios';
import App from 'next/app'
import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Personal } from '../../components/personal';
import { Tweets } from '../../components/Tweets';
import { Nfts } from '../../components/Nfts';
import { Bio } from '../../components/Bio';
import { FAQ } from '../../components/FAQ';
import _404 from '../404';
// import { Fab } from '../../components/editor/fab';


const User = ({ uInfo, pathFullInfo }: any) => {
    const [hasTwtr, setHasTwtr] = React.useState<number>(2);

    const userInfo = React.useRef((uInfo) ? uInfo : pathFullInfo).current;

    React.useEffect(() => {
        if(userInfo !== false)
        setHasTwtr((prevState) => {
            console.log(prevState);
            const currentState = userInfo.links && userInfo.links.twitter ? 2 : 3;
            console.log(currentState);
            console.log(userInfo);
            return currentState;
        })
    }, [userInfo])
    
    return (<>
        {userInfo !== false && Object.keys(userInfo).length > 0 ?
            <>
                <Head>
                    <title>{`${userInfo.currentLabel} | ar.page`}</title>
                    <meta name="description" content={`${userInfo.currentLabel} | ar.page`} />
                </Head>
                <div className="flex flex-wrap mb-10">
                
                    <div className={(hasTwtr === 2) ?
                        "flex flex-col lg:w-2/3 gap-y-0 lg:h-fit lg:max-h-screen w-full" :
                        "flex flex-col lg:h-fit gap-y-0 lg:max-h-screen w-full"}>

                        <Personal userInfo={userInfo}
                            className={(`mt-6 mb-6 lg:px-3 px-6 mx-1 rounded-md shadow-md border-2 border-prim1 shadow-black -m-6 shrink-0 lg:h-52`)}
                        />

                        <Bio userInfo={userInfo}
                            className={(`my-3 -mt-3 lg:px-3 px-6 mx-1 rounded-md shadow-md border-2 border-prim1 shadow-black -m-6 shrink-0 lg:h- h-36 flex justify-center align-middle`)}
                        />
                        <Nfts userInfo={userInfo}
                            className={`mx-1 -left-1 max-w-full overflow-hidden border-2 border-prim1 rounded-md lg:px-0 px-3 pb-14 lg:pb-0 lg:shrink-0 lg:h-auto shadow-md shadow-black`}
                        />

                    </div>
                    {hasTwtr === 2 ?
                        <div className="flex flex-col lg:h-[45.5rem] w-1/3">
                            <Tweets user={userInfo.links.twitter} className="mt-6 pb-5 px-6 overflow-y-hidden hidden lg:grid shrink-0 h-[46.25rem]" />
                        </div>
                        : <></>}
                </div></> : <FAQ />} 
    </>

    )
}

User.getInitialProps = async ({ query }: { query: { user: string; } }) => {
    try {
        const res = await axios.get(`https://ans-testnet.herokuapp.com/profile/${query.user}`);
        const userInfo = res.data;  // <-- Access one more data object here
        return { pathFullInfo: userInfo };
    } catch (error) {
        console.log("attempting to use domain routing...")
        return { pathFullInfo: false};
    };
};

export default User