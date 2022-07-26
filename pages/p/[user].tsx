import axios from 'axios';
import App from 'next/app'
import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Index from '../../components_new/home'
import { LeftPanel } from '../../components_new/user/leftPanel';
import { NameContent } from '../../components_new/user/name-content';

// import { Fab } from '../../components/editor/fab';


const User = ({ uInfo, pathFullInfo }: any) => {
    const [hasTwtr, setHasTwtr] = React.useState<number>(2);
    const [nftCount, setNftCount] = React.useState<number>(0);

    const userInfo = React.useRef((uInfo) ? uInfo : pathFullInfo).current;

    React.useEffect(() => {
        if (userInfo !== false)
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

                    <meta name="twitter:image" content={(userInfo.avatar !== "") ? `https://arweave.net/${userInfo.avatar}` : "https://ar.page/favicon.png"} />
                    <meta name="twitter:title" content={`${userInfo.currentLabel} | ar.page`} />
                    <meta name="twitter:url" content={`https://${userInfo.currentLabel}.ar.page`}></meta>
                    <meta name="twitter:description" content={userInfo.bio} />
                </Head>
                <div className="flex flex-row flex-wrap h-full w-[100%]">
                    <div className="w-[191px] bg-white lg:flex hidden fixed">
                        <LeftPanel />
                    </div>
                    <div className="w-[191px] lg:flex hidden " />
                    <div className="lg:w-[80.5%] mx-auto bg-[#FAFAFA] h-body">
                        <NameContent userInfo={userInfo} />
                    </div>
                </div>

            </> : <Index />}
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
        return { pathFullInfo: false };
    };
};

export default User
