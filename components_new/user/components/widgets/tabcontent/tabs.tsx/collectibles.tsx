import { useState, useEffect } from 'react';
import { LoadingOrNotFound, SearchBar, NFTGallery } from '../../../reusables';
import { NFT } from '../../../../../../src/types';
import { ChainFilter } from '../../../../../buttons';
import { Button } from '../../../../../../src/stories/Buttons';
import { useRecoilState } from 'recoil';
import { isDarkMode } from '../../../../../../atoms';
 
export default function Collectibles({NFTs, loading, perPage, handleVisibility}: 
{NFTs: NFT[], loading: boolean, perPage: number, handleVisibility: (res: boolean) => void}) {

  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>(NFTs);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [ascending, setAscending] = useState<boolean>(true);
  const [network, setNetwork] = useState<string>("arweave");
  const [search, setSearch] = useState<string>('');
  const [isDark, setIsDark] = useRecoilState(isDarkMode); 

  const filterTime = () => filteredNFTs.sort((a, b) => ascending ? a.timestamp! - b.timestamp!: b.timestamp! - a.timestamp!)
  const filterNetwork = () => NFTs.filter((nft) => nft.chain === network);

  const onSearch = (e: string) => {
    setSearch(e);
    setFilteredNFTs(NFTs.filter((nft) => nft.title!.toLowerCase().includes(e.toLowerCase())));
  };

  // Hook setting filteredNFTs state
  useEffect(() => {
    setFilteredNFTs(filterNetwork());
    setOnLoad(true);
  }, [NFTs]);

  // Hook change in network state
  useEffect(() => {
    setFilteredNFTs(filterNetwork());
    setAscending(true); //resets prior ascending filters
  }, [network]);

  // Hook to update parent on filteredNft changes
  useEffect(() => {
    handleVisibility(filteredNFTs.length > 0 ? true : false);
  }, [filteredNFTs]);

  // Hook to grab light theme
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
  {/*<meta name="twitter:title" content="test 2 | Home" />*/}

  return (
    <div className={`transition-opacity duration-400 pb-3  opacity-0 ${(onLoad && !loading) && 'opacity-100'}`}>

      {/*Render Filter Capabilities*/}

      <div className={`flex flex-col items-center justify-center md:flex-row md:items-end md:justify-between mb-8 sm:flex-row sm:space-x-2 `}>
        {/*Search Collectables*/}
        <SearchBar 
          value={search} 
          onChange={(e) => onSearch(e)} 
          placeholder={"Search collectables"} 
          slideOutable={true} 
        />
        {/*Filter Chain Buttons*/}
        <ChainFilter
          activeChain={network}
          onClick={(e: any) => {
            e.preventDefault();
            setNetwork(e.currentTarget.value);
          }}
        />
        {/*Sort Chronology Button*/}
        {filteredNFTs.length > 0 && (
          <Button
            variant='secondary'
            className={"text-black border-2 border-slate-300 rounded-xl"}
            onClick={() => setAscending(() => {
              filterTime();
              return !ascending;
            })}
            isDark={isDark}
          >
            {ascending ? "Newest" : "Oldest"}
          </Button>
        )}
      </div>

      {/*Render Gallery*/}

      {filteredNFTs.length > 0 ?
      (
        <NFTGallery 
          NFTs={filteredNFTs} 
          perPage={perPage} 
        />
      )
      : 
      (
        <LoadingOrNotFound 
          loading={loading} 
          jsxNotFound={"No NFTs found"}
        />
      )}
    </div>
  )
};
