import { useState, useEffect, useCallback } from 'react';
import { LoadingOrNotFound, SearchBar, NFTGallery } from '../../../reusables';
import { NFT } from '../../../../../../src/types';

export default function Collectibles({NFTs, loading}: {NFTs: NFT[], loading: boolean}) {
  const [filteredNFTs, setFilteredNFTs] = useState<NFT[]>(NFTs);

  const [onLoad, setOnLoad] = useState<boolean>(false);

  const [ascending, setAscending] = useState<boolean>(true);
  const filter = () => filteredNFTs.sort((a, b) => ascending ? a.timestamp - b.timestamp: b.timestamp - a.timestamp)

  const [search, setSearch] = useState<string>('');
  const onSearch = (e: string) => {
    setSearch(e);
    setFilteredNFTs(NFTs.filter((nft) => nft.title.toLowerCase().includes(e.toLowerCase())));
  };

  useEffect(() => {
    setFilteredNFTs(NFTs)
    setOnLoad(true);
  }, [NFTs])

  return (
    <div className={`transition-opacity duration-400 pb-3  opacity-0 ${(onLoad && !loading) && 'opacity-100'}`}>
      <div className={`flex flex-col md:flex-row  md:items-end md:justify-between mb-8 sm:flex-row sm:space-x-2 `}>
        <SearchBar value={search} onChange={(e) => onSearch(e)} placeholder={"Search collectables"} slideOutable={true} />
        <div className="flex items-center sm:relative sm:bottom-2">
          {/* <button className="bg-primary/20 text-primary rounded-lg hover:bg-primary/30 p-2 flex items-center mr-2">
            <ListBulletIcon height={20} width={20} strokeWidth={3}/>
          </button>
          <button className="bg-primary/20 text-primary rounded-lg hover:bg-primary/30 p-2.5 flex items-center mr-2">
            <BsGrid height={25} width={25} strokeWidth={1}/>
          </button> */}
          <button
            className="bg-primary/20 text-primary font-semibold rounded-lg hover:bg-primary/30 
              py-1.5 px-2.5 flex items-center mt-4 md:mt-0 "
            onClick={() => setAscending(() => {
              filter()
              return !ascending
            })}
          >
            {ascending ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      {filteredNFTs.length > 0 ? (
        <NFTGallery NFTs={filteredNFTs} />
      ): (
        <LoadingOrNotFound loading={loading} jsxNotFound={"No NFTs found"} />
      )}
    </div>
  )
};
