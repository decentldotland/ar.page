/**
 * Sends a request to the specified URL and returns the 'Content-Type' header of the response.
 * @param {string} url - The URL of the resource.
 * @returns {Promise<string>} - The 'Content-Type' header of the response.
 */
export async function getContentType(url: string) {
    try {
      const response = await fetch(url);
      const contentType = response.headers.get('Content-Type');
      return contentType;
    } catch (error) {
      console.error(error);
    }
}
  
/**
 * Determines whether the resource at the specified URL is an image or a video.
 * @param {string} url - The URL of the resource.
 */
export async function checkContentType(url: string) {
    const contentType = await getContentType(url);
    console.log(contentType);
    /*
    if (contentType.startsWith('image/')) {
        console.log('This is an image');
    } else if (contentType.startsWith('video/')) {
        console.log('This is a video');
    } else {
        console.log('This is not an image or a video');
    }
    */
}
