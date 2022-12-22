import axios from "axios";
import { useEffect, useState } from "react";

interface fetchProfileProps {
    arweaveAddr: string;
}

export const FetchProfile = (props: fetchProfileProps) => {

    const [initialized, setInitialized] = useState<boolean>(false);
    // Errors
    const [domainError, setDomainError] = useState<boolean>(false);
    const [bioError, setBioError] = useState<boolean>(false);
    const [nftError, setNftError] = useState<boolean>(false);

    /**
     * Fetch domains linked to user's arweave address
     * @param arweaveAddr - string containing arweave address
     * @returns Domain payload
     */
    const fetchDomains = (arweaveAddr: string) => {
        console.log("BEGIN fetching domains"); // test
        try {
            const domains = axios(`/api/domains/${arweaveAddr}`);
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
        fetchDomains(props.arweaveAddr);
        setInitialized(true);
    }

    // Run hook after page load
    useEffect(() => {
        initialize();
    }, []);

    return 
}  