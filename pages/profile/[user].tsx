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
// import { useRouter } from 'next/router'


const User = ({ userInfo }: any) => {
    const [hasTwtr, setHasTwtr] = React.useState<number>(2);

    React.useEffect(() => {
        setHasTwtr((prevState) => {
            console.log(prevState);
            const currentState = userInfo.links && userInfo.links.twitter ? 2 : 3;
            console.log(currentState);
            console.log(userInfo);
            return currentState;
        })
    }, [userInfo])
    // const personalCss = React.useRef(`my-6 p-6 col-span-3 lg:${hasTwitter ? "col-span-2" : "col-span-3"} lg:row-span-1 lg:py-6 rounded-xl shadow-md border-2 border-prim1 shadow-gray-700`).current;
    return ( <>{!userInfo.error && Object.keys(userInfo).length > 0 ?
        <div className="flex flex-wrap h-[48.75rem]">
            <div className={(hasTwtr === 2) ? 
            "flex flex-col lg:w-2/3 lg:h-fit max-h-screen w-full": 
            "flex flex-col lg:h-fit max-h-screen w-full"}>
            <Personal userInfo={userInfo} className={(`mt-6 mb-6 lg:px-3 px-6 mx-1 rounded-xl shadow-md border-2 border-prim1 shadow-gray-700 -m-6 shrink-0 lg:h-52`)} />

            <Bio userInfo={userInfo} className={(`my-3 -mt-3 lg:px-3 px-6 mx-1 rounded-xl shadow-md border-2 border-prim1 shadow-gray-700 -m-6 shrink-0 lg:h- h-36 flex justify-center align-middle`)} />
            {/* {hasTwtr === 2 ? <Tweets user={userInfo.links.twitter} className="mt-6 mb-12 px-6 col-span-1 row-span-6 w-full overflow-y-hidden hidden lg:grid" /> : <></>} */}

            <Nfts className={`min-w-full lg:overflow-hidden overflow-visible border-2 lg:border-prim1 border-back rounded-xl lg:px-0 px-6 lg:shrink-0 lg:h-84 h-full`} userInfo={userInfo} />
            </div>
            {hasTwtr === 2 ? 
            <div className="flex flex-col h-[45.5rem] w-1/3">
                <Tweets user={userInfo.links.twitter} className="mt-6 pb-5 px-6 overflow-y-hidden hidden lg:grid lg:shrink-0 h-[45.5rem]"/>
            </div> 
            : <></>}
        </div> : <FAQ />}
        </>

    )
}

User.getInitialProps = async ({ query }: { query: { user: string; } }) => {
    try {
        const res = await axios.get(`https://ans-testnet.herokuapp.com/profile/${query.user}`);
        const userInfo = res.data;  // <-- Access one more data object here
        return { userInfo };
    } catch (error) {
        return { userInfo: { error : true } };
    };
};

export default User