import { ArweaveTransaction } from "../types";

// write all the social events here
export function arweaveTransactionHandler (transaction: ArweaveTransaction): string {
  const tags = transaction.tags
  const appNames = tags.map(tag => tag.name === "App-Name" ? tag.value : '').filter(tag => tag !== '')
  if (appNames.length > 0 && appNames[0].length) return appNames[0];
  return "Unknown App";
}

export function removeHttp(url: string) {
  if (url.startsWith('https://www.'))  {
    const https = 'https://www.';
    return url.slice(https.length);
  }

  if (url.startsWith('https://'))  {
    const https = 'https://';
    return url.slice(https.length);
  }

  if (url.startsWith('http://www.')) {
    const http = 'http://www.';
    return url.slice(http.length);
  }
  if (url.startsWith('www.')) {
    const http = 'www.';
    return url.slice(http.length);
  }

  return url;
}