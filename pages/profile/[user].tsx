import axios from 'axios';
import React from 'react';
import Head from 'next/head'

import _404 from '../404';
import Index from '../../components_new/home';

import UserPage from '../../components_new/user';
import { useRecoilValue } from 'recoil';

import { editModalState, userInfoState } from '../../atoms';
import EditModal from '../../components_new/user/components/modals/EditModal';

const User = ({ uInfo, pathFullInfo }: any) => {

  const userInfo = React.useRef((uInfo) ? uInfo : pathFullInfo).current;
  const showModel = useRecoilValue(editModalState);

  return !!userInfo && Object?.keys(userInfo)?.length > 0 ?
    <>
      <Head>
        <title>{`${userInfo.currentLabel} | ar.page`}</title>
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href={`https://pz-prepnb.meson.network/${userInfo.avatar}`} /> {/* TODO: potential source of vulnerabilities if users somehow upload malicious text or images */}
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
        <meta name="description" content={`${userInfo.bio} | ar.page`} />
        <meta name="twitter:image" content={(userInfo.avatar !== "") ? `https://pz-prepnb.meson.network/${userInfo.avatar}` : "https://ar.page/favicon.png"} />
        <meta name="twitter:title" content={`${userInfo.currentLabel} | ar.page`} />
        <meta name="twitter:url" content={`https://${userInfo.currentLabel}.ar.page`}></meta>
        <meta name="twitter:description" content={userInfo.bio} />
        <meta name="twitter:site" content="@decentdotland" />

        <meta name="og:card" content="summary"></meta>
        <meta name="description" content={`${userInfo.currentLabel} | ar.page`}></meta>
        <meta name="og:image" content={(userInfo.avatar !== "") ? `https://pz-prepnb.meson.network/${userInfo.avatar}` : "https://ar.page/favicon.png"} ></meta>
        <meta name="og:title" content={`${userInfo.currentLabel} | ar.page`}></meta>
        <meta name="og:url" content={`https://${userInfo.currentLabel}.ar.page`}></meta>
        <meta name="og:description" content={userInfo.bio}></meta>
      </Head>
      <UserPage userInfo={userInfo} />
      {showModel && <EditModal />}
    </>
    :
    <Index />
}

User.getInitialProps = async ({ query }: { query: { user: string; } }) => {
  try {
    if (!query.user) return
    const res = await axios.get(`http://ans-stats.decent.land/profile/${query.user}`);
    const userInfo = res.data;
    return { pathFullInfo: userInfo };
  } catch (error) {
    console.log("attempting to use domain routing...");
    return { pathFullInfo: false };
  };
};

export default User;
