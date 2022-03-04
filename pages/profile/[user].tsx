import axios from 'axios';
import App from 'next/app'
import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Personal } from '../../components/personal';
import { Tweets } from '../../components/Tweets';
import { Nfts } from '../../components/Nfts';
import { UserNotFound } from '../../components/UserNotFound';
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
    // const personalCss = React.useRef(`my-6 p-6 col-span-3 lg:${hasTwitter ? "col-span-2" : "col-span-3"} lg:row-span-1 lg:py-6 rounded-3xl shadow-md border-2 border-prim1 shadow-gray-700`).current;
    return ( !userInfo.error && Object.keys(userInfo).length > 0 ?
        <div className="lg:grid grid-cols-3 grid-rows-6 gap-x-6 lg:max-h-screen">
             {hasTwtr === 2 ? <Personal userInfo={userInfo} className={(`my-6 lg:px-3 px-6 py-6 mx-1 col-span-3 lg:col-span-2 lg:row-span-2 rounded-3xl shadow-md border-2 border-prim1 shadow-gray-700 -m-6`)} />  :
             <Personal userInfo={userInfo} className={(`my-6 p-6 mx-1 col-span-3 lg:col-span-3 lg:row-span-1 lg:py-6 rounded-3xl shadow-md border-2 border-prim1 shadow-gray-700 -m-6`)} />}

            {hasTwtr === 2 ? <Tweets user={userInfo.links.twitter} className="mt-6 mb-12 px-6 col-span-1 row-span-6 w-full overflow-y-hidden hidden lg:grid lg:max-h-screen" /> : <></>}
            {hasTwtr === 2 ?  <Nfts className={`min-w-full mb-12 col-span-1 lg:col-span-2 row-span-4 overflow-hidden border-2 border-prim1 rounded-3xl lg:px-0 px-6`} userInfo={userInfo} />:
            <Nfts className={`min-w-full mb-12 col-span-1 row-span-1 lg:row-span-4 overflow-hidden lg:overflow-visible border-2 border-prim1 rounded-3xl lg:px-0 px-6`} userInfo={userInfo} />}
            {hasTwtr === 2 ? <Tweets user={userInfo.links.twitter} className="my-6 px-6 col-span-3 row-span-5 w-full overflow-y-hidden lg:hidden grid 0" /> : <></>}
        </div> : <UserNotFound className="" />

    )
}
// bg-gradient-to-b from-prim2 via-prim2 to-gray-500

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