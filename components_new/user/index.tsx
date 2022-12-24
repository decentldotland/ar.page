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
  const { domains } = FetchDomain(userArweaveAddr);
  const { nfts, nftsInitialized } = FetchNfts(userArweaveAddr);
  const bio = typeof props.userInfo.bio === 'string' ? 
  props.userInfo.bio : "";
  const info = props.userInfo;

  console.log(nftsInitialized);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [arkProfile, setArkProfile] = useState<Res | undefined>();

  // Fetch Near NFTs by near address and ar handle
  const fetchNearNFTs = async(address: string) => {
    return await axios.get(`/api/nep/${address}`);
  }
  // Fetch a users wallet address
  const fetchData = async (arweaveAddr: string, userHandle: string) => {
    setLoading(true);
    const result = await axios.get(`/api/profile/${arweaveAddr}`);
    let linkInfo = await axios.post(`/api/exmread`);

    //@ts-ignore
    // Find User by Arweave Id
    const userAddresses = linkInfo.data.identities ? linkInfo.data.identities.find(identity=> identity.arweave_address === arweaveAddr) : "";
    // Find Near Addresses of User
    let nearAddresses = userAddresses.addresses ?
    //@ts-ignore 
    userAddresses.addresses.map(address => { 
      if(address.network === "NEAR-MAINNET") {
        return address;
      }
    }) 
    : "";

    // Find NFTs by NEAR Address
    //@ts-ignore 
    const nearNfts = await Promise.all(nearAddresses.map(async nearInfo => {
      if(nearInfo) {
        let res = await fetchNearNFTs(nearInfo.address);
        return res;
      }
    }));
    
    // If multiple Near wallets, this will join all NFTs into one array
    let holdNfts: any[] = [];
    for(let i = 0; i < nearNfts.length; i++) {
      if(nearNfts[i] !== undefined) {
        for(let j = 0; j < nearNfts[i].data.result.length; j++) {
          holdNfts.push(nearNfts[i].data.result[j]);
        }
      }
    }

    // Parse final payload containing all NFTS
    let parsed = JSON.parse(result.data);
    if (parsed.res) {
      parsed.res["NEAR_NFTS"] = holdNfts;
      const resObj: Res = parsed?.res;
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
            nfts={nfts}
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
