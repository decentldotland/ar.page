import axios from "axios";
import { useEffect, useState } from "react";

export const FetchNfts = (arweaveAddr: string) => {

    const [nftsInitialized, setNftsInitialized] = useState<boolean>(false);
    const [nftsError, setNftsError] = useState<boolean>(false);

    /**
     * Fetch NFTS linked to user's arweave address
     * @param arweaveAddr - string containing arweave address
     * @returns Nfts payload
     */
    const fetchNfts = async (arweaveAddr: string) => {
        console.log("BEGIN fetching NFTS"); // test
        try {
            const nfts = await axios(`/api/allnft/${arweaveAddr}`);
            console.log("NFTS: ", nfts);
            return nfts;
        } catch(e: any) {
            console.log("Error Fetching Nfts in FetchProfile Component: ", e);
            setNftsError(true);
        }
        console.log("TERMINATE fetching nfts");
    }
    
    // Initialize all fetching asynchronously
    const initialize = async() => {
        fetchNfts(arweaveAddr);
        setNftsInitialized(true);
    }

    // Run hook after page load
    useEffect(() => {
        initialize();
    }, []);

    return { nftsInitialized, nftsError };
}  