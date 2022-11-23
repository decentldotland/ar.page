import { useState, useEffect } from 'react';
import { LoadingOrNotFound, SearchBar, NFTGallery } from '../../../reusables';
import { NFT } from '../../../../../../src/types';
import { ChainFilter } from '../../../../../buttons';
import { SortChronButton } from '../../../../../buttons';
import { Button } from '../../../../../../src/stories/Button';
 
export default function Collectibles({NFTs, loading, perPage}: {NFTs: NFT[], loading: boolean, perPage: number}) {

  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>(NFTs);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [ascending, setAscending] = useState<boolean>(true);
  const [network, setNetwork] = useState<string>("arweave");
  const [search, setSearch] = useState<string>('');

  const filterTime = () => filteredNFTs.sort((a, b) => ascending ? a.timestamp! - b.timestamp!: b.timestamp! - a.timestamp!)
  const filterNetwork = () => NFTs.filter((nft) => nft.chain === network);

  const onSearch = (e: string) => {
    setSearch(e);
    setFilteredNFTs(NFTs.filter((nft) => nft.title!.toLowerCase().includes(e.toLowerCase())));
  };

  //Hook setting filteredNFTs state
  useEffect(() => {
    setFilteredNFTs(filterNetwork());
    setOnLoad(true);
    console.log(NFTs);
  }, [NFTs]);

  //Hooks change in network state
  useEffect(() => {
    setFilteredNFTs(filterNetwork());
    setAscending(true); //resets prior ascending filters
  }, [network]);


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
        <Button
          variant='secondary'
          className={"text-black border-2 border-slate-300 rounded-xl"}
          onClick={() => setAscending(() => {
            filterTime();
            return !ascending;
          })}
        >
          {ascending ? "Newest" : "Oldest"}
        </Button>
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
