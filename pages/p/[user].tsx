import axios from 'axios';
import React from 'react';
import Head from 'next/head';
import Index from '../../components_new/home';
import UserPage from '../../components_new/user';
import { useRecoilValue } from 'recoil';
import { editModalState, userInfoState } from '../../atoms';
import EditModal from '../../components_new/user/components/modals/EditModal';

const User = ({ uInfo, pathFullInfo }: any) => {
    const [hasTwtr, setHasTwtr] = React.useState<number>(2);
    const [nftCount, setNftCount] = React.useState<number>(0);
    const userInfo = React.useRef((uInfo) ? uInfo : pathFullInfo).current;
    React.useEffect(() => {
        if (userInfo) {
            setHasTwtr((prevState) => {
                const currentState = userInfo.links && userInfo.links.twitter ? 2 : 3;
                return currentState;
            })
        }
    }, [userInfo])

    const showModel = useRecoilValue(editModalState);
     const movie = useRecoilValue(userInfoState);
    return (
        <>
            {userInfo !== false && Object.keys(userInfo).length > 0 ?
                <>
                    <Head>
                        <title>{`${userInfo.currentLabel} | ar.page`}</title>
                        <meta name="twitter:card" content="summary" key="cardTwitter" />
                        <meta name="description" content={`${userInfo.currentLabel} | ar.page`} />
                        <meta name="twitter:image" content={(userInfo.avatar !== "") ? `https://pz-prepnb.meson.network/${userInfo.avatar}` : "https://ar.page/favicon.png"} key="imageTwitter" />
                        <meta name="twitter:title" content={`${userInfo.currentLabel} | ar.page`} key="titleTwitter" />
                        <meta name="twitter:title" content="ar.page | Home" />
                        <meta name="twitter:url" content={`https://${userInfo.currentLabel}.ar.page`} key="urlTwitter" />
                        <meta name="twitter:description" content={userInfo.bio} key="descriptionTwitter" />

                        <meta name="og:card" content="summary"  />
                        <meta name="description" content={`${userInfo.currentLabel} | ar.page`} />
                        <meta name="og:image" content={(userInfo.avatar !== "") ? `https://pz-prepnb.meson.network/${userInfo.avatar}` : "https://ar.page/favicon.png"} />
                        <meta name="og:title" content={`${userInfo.currentLabel} | ar.page`} />
                        <meta name="og:title" content="ar.page | Home" />
                        <meta name="og:url" content={`https://${userInfo.currentLabel}.ar.page`} />
                        <meta name="og:description" content={userInfo.bio} />
                    </Head>
                    <UserPage userInfo={userInfo} />
                    { showModel && <EditModal/>}
                </> : <Index />}
        </>
    )
}

User.getInitialProps = async ({ query }: { query: { user: string; } }) => {
    try {
        if (!query.user) return
        const res = await axios.get(`http://ans-stats.decent.land/profile/${query.user}`);
        const userInfo = res.data;  // <-- Access one more data object here
        return { pathFullInfo: userInfo };
    } catch (error) {
        console.log("attempting to use domain routing...")
        return { pathFullInfo: false };
    };
};

export default User;
