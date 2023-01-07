import axios from "axios";
  
/**
 * Determines whether the resource at the specified URL is an image or a video.
 * @note - we must call Next API to avoid CORs with some NFT links
 * @param {string} url - The URL of the resource.
 */
export async function checkContentType(url: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('url', url);

    const contentType = await axios(`/api/contentType/url?${searchParams.toString()}`);
    return contentType.data;
}

/**
 * Determines Error Code for the Specified Url
 * @note - Will help determine contingency to show media (video, too large img, etc.)
 * @param {string} url - The URL of the resource.
 */
export async function checkContentError(url: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('url', url);

    const contentError = await axios(`/api/errorHandling/nftImage?${searchParams.toString()}`);
    return contentError;
}
