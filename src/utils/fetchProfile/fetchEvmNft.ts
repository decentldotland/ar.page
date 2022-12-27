import axios from "axios";
import { useState } from "react";

export const FetchEvmNfts = () => {

    const [evmNftsLoading, setEvmNftsLoading] = useState<boolean>(false);
    const [evmNftsError, setEvmNftsError] = useState<boolean>(false);
    const [evmSearchedList, setEvmSearchList] = useState<string[]>([]);

    /**
     * Fetch NFTS linked to user's arweave address
     * @param arweaveAddr - string containing arweave address
     * @param chain - string containing chain to draw data
     * @returns Nfts payload
     */

    const fetchEvmNfts = async (arweaveAddr: string, chain: string) => {
        setEvmNftsLoading(true);

        const searchParams = new URLSearchParams();
        searchParams.set('chain', chain);
        searchParams.set('arweaveAddr', arweaveAddr);

        try {
            const evmnft = await axios(`/api/evmnft/payload?${searchParams.toString()}`);
            setEvmSearchList([...evmSearchedList, chain]);
            setEvmNftsLoading(false);
            return evmnft.data;
        } catch(e: any) {
            console.log("Error Fetching EVM Nfts in FetchEvmNft Component: ", e);
            setEvmNftsError(true);
            setEvmNftsLoading(false);
        }
    }

    return { evmNftsLoading, evmSearchedList, evmNftsError, fetchEvmNfts };
}  