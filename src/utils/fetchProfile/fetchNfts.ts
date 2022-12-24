import axios from "axios";
import { useEffect, useState } from "react";

export const FetchNfts = (arweaveAddr: string) => {

    const [nftsInitialized, setNftsInitialized] = useState<boolean>(false);
    const [nftsError, setNftsError] = useState<boolean>(false);
    const [nfts, setNfts] = useState<any>(null);

    /**
     * Fetch NFTS linked to user's arweave address
     * @param arweaveAddr - string containing arweave address
     * @returns Nfts payload
     */
    const fetchNfts = async (arweaveAddr: string) => {
        try {
            const nft = await axios(`/api/allnft/${arweaveAddr}`);
            console.log("NFT GROUP: ", nft);
            setNfts(nft.data);
        } catch(e: any) {
            console.log("Error Fetching Nfts in FetchProfile Component: ", e);
            setNftsError(true);
        }
    }
    
    // Initialize all fetching asynchronously
    const initialize = async() => {
        await fetchNfts(arweaveAddr);
        setNftsInitialized(true);
    }

    // Run hook after page load
    useEffect(() => {
        initialize();
    }, []);

    return { nfts, nftsInitialized };
}  