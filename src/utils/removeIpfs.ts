export const removeIpfs = (ipfsUrl: string) => {
    if(ipfsUrl.substring(0, 4) === "ipfs") {
        return ipfsUrl.substring(7,);
    } else {
        return ipfsUrl;
    }
}
