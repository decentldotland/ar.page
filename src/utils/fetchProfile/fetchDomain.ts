import axios from "axios";
import { useEffect, useState } from "react";

export const FetchDomain = (arweaveAddr: string) => {

    const [domainInitialized, setDomainInitialized] = useState<boolean>(false);
    const [domainError, setDomainError] = useState<boolean>(false);

    /**
     * Fetch domains linked to user's arweave address
     * @param arweaveAddr - string containing arweave address
     * @returns Domain payload
     */
    const fetchDomains = async (arweaveAddr: string) => {
        console.log("BEGIN fetching domains"); // test
        try {
            const domains = await axios(`/api/domains/${arweaveAddr}`);
            console.log("DOMAINS: ", domains);
            return domains;
        } catch(e: any) {
            console.log("Error Fetching Domains in FetchProfile Component: ", e);
            setDomainError(true);
        }
        console.log("TERMINATE fetching domains");
    }
    
    // Initialize all fetching asynchronously
    const initialize = async() => {
        fetchDomains(arweaveAddr);
        setDomainInitialized(true);
    }

    // Run hook after page load
    useEffect(() => {
        initialize();
    }, []);

    return { domainInitialized, domainError };
}  