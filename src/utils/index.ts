import axios from "axios";
import { ArweaveTransaction } from "../types";


// for handling redirects / url switches to a different page, treat this as a "return url" function
export function resolveDomain(username: string) {
  let domain = "";
  if (username.length > 0) domain = username + ".";
  const protocol = window.location.protocol + '//';
  const host = window.location.host.split(".");
  // host can be several different urls:
  // ar.page, xy.ar.page, localhost:3000. xy.localhost:3000
  // this logic is to handle switching between different domains, and to handle localhost
  let final = ""
  if (window.location.host.includes("localhost")) {
    if (host.length > 1) final = domain + host[1]
    else final = domain + host[0]
  } else if (host.length > 2) {
    final = domain + host[1] + "." + host[2];
  } else final = domain + host[0] + "." + host[1];
  
  return protocol + final;
}

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


export const shortenName = (addr: string) => {
  if (addr.length > 5) {
    return addr.substring(0, 4) + '...'
  }
  return addr
}
export const shortenAddress = (addr: string) => {
  if (addr) {
    return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4)
  }
  return addr
}
export async function getAllPoaps(evm_address: string) {
  try {
    const API_KEY = process.env.POAP_API_KEY;
    const res = await axios.get(
      `https://api.poap.tech/actions/scan/${evm_address}`,
      {
        headers: { "Content-Type": "application/json", "X-API-Key": API_KEY! },
      }
    );
    return res?.data;
  } catch (error) {
    return null;
  }
}
