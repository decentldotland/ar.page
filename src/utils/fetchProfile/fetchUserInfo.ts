import axios from "axios";
import { useEffect, useState } from "react";

export const FetchUserInfo = (arweaveAddr: string) => {

    const [userInitialized, setUserInitialized] = useState<boolean>(false);
    const [userInfoError, setUserInfoError] = useState<boolean>(false);

    /**
     * Fetch user info linked with their arweave address
     * @param arweaveAddr - string containing arweave address
     * @returns User info payload
     */
    const fetchUserInfo = async (arweaveAddr: string) => {
        try {
            const userInfo = await axios(`/api/userinfo/${arweaveAddr}`);
            return userInfo;
        } catch(e: any) {
            console.log("Error Fetching User Info in FetchUserInfo Component: ", e);
            setUserInfoError(true);
        }
    }
    
    // Initialize all fetching asynchronously
    const initialize = async() => {
        fetchUserInfo(arweaveAddr);
        setUserInitialized(true);
    }

    // Run hook after page load
    useEffect(() => {
        initialize();
    }, []);

    return { userInitialized, userInfoError };
}  