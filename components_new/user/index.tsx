import axios from 'axios';
import { useState, useEffect } from 'react';
import { userInfo, Res } from '../../src/types';
import { EditModal } from '../../components/editor/editmodal';
import { UserInfo } from './components/userInfo';
import Widgets from './components/widgets';
import CoverPage from './components/CoverPage';
import { Koii, ArweaveTransaction } from '../../src/types';
import { Toaster } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../atoms';
import { FetchDomain } from '../../src/utils/fetchProfile/fetchDomain';
import { FetchNfts } from '../../src/utils/fetchProfile/fetchNfts';

function PageContent(props: userInfo) {
  const userArweaveAddr = props.userInfo.user;
  const { domains, domainInitialized } = FetchDomain(userArweaveAddr);
  const { nfts, nftsInitialized } = FetchNfts(userArweaveAddr);
  const info = props.userInfo;

  const [loading, setLoading] = useState<boolean>(true);
  const [arkProfile, setArkProfile] = useState<Res | undefined>();

  // Fetch a users wallet address
  const fetchData = async (arweaveAddr: string, userHandle: string) => {
    setLoading(true);
    let result = await axios.get(`/api/profile/${arweaveAddr}`);

    // Parse final payload containing all NFTS
    let parsed = JSON.parse(JSON.stringify(result.data.res));
    if (parsed) {
      const resObj: Res = parsed;
      setArkProfile(resObj);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (props.userInfo.user) {
      fetchData(props.userInfo.user, props.userInfo.currentLabel);
    };
  }, []);

  const [isDark, setIsDark] = useRecoilState(isDarkMode);
  useEffect(() => {
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (localStorage.theme === 'ardark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        localStorage.setItem('theme', 'ardark');
        setIsDark(true)
      } else {
        localStorage.setItem('theme', 'arlight');
        setIsDark(false)
      }
  }, [isDark]);

  return (
    <div className=" w-full font-inter h-screen" data-theme={isDark ? "ardark" : "arlight"}>
      <Toaster position='top-center'/>
      <CoverPage userInfo={props.userInfo} />
      <div className="flex xl:justify-center" data-theme={isDark ? "ardark" : "arlight"}>
        <div className="flex flex-col px-6 md:px-16 sm:px-10  max-w-[100vw] xl:max-w-[1145px] w-full">
          <UserInfo 
            user={{userInfo: info}} 
            profile={arkProfile}
            domains={domains}
            domainsLoaded={domainInitialized}
          />
          <EditModal
            userColor={info.address_color} 
            wallet={info.user} 
            userInfo={props} 
          /> 
          {/* @ts-ignore  sorry about this */}
          <Widgets 
            arkProfile={arkProfile} 
            loading={loading}
            nftLoading={nftsInitialized}
            nfts={nfts}
            arweaveAddr={userArweaveAddr ? userArweaveAddr : null}
          />
        </div>
      </div>
    </div>
  );
}

export default function UserPage (props: userInfo) {
  return (
    <div className="md:flex h-full w-full relative">
      {/* <div className="h-full max-h-full overflow-clip w-[250px] md:block hidden bg-base-100">
        <Sidebar />
      </div> */}
      <div className="w-full h-body ">
        <PageContent userInfo={props.userInfo} />
      </div>
    </div>
  )
}
