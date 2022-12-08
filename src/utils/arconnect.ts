import { PermissionType } from "arconnect";
import { useEffect, useState } from "react";
import Arweave from "arweave";

export const permissions: PermissionType[] = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION",
  "ACCESS_PUBLIC_KEY",
  "SIGNATURE"
];

type Hook = [string | undefined, () => Promise<void>, () => Promise<void>, string];

export const useArconnect = (): Hook => {
  const [address, setAddress] = useState<string>();
  const [arconnectError, setArconnectError] = useState<string>('');

  useEffect(() => {
    let apiInjected = false;

    const loadedEvent = async () => {
      if (address) return;
      apiInjected = true;

      try {
        const currentPerms = await window.arweaveWallet.getPermissions();
        const correctPerms = permissions.sort().toString() == currentPerms.sort().toString();
        if (!correctPerms) {
          await window.arweaveWallet.disconnect();
          if (currentPerms.length !== 0) setArconnectError('Re-connect with correct permissions.');
          return;
        }
        const addr = await window.arweaveWallet.getActiveAddress();
        setArconnectError('');
        setAddress(addr);
      } catch {}
    };

    window.addEventListener("arweaveWalletLoaded", loadedEvent);

    // double check if arconnect was added
    setTimeout(() => {
      if (apiInjected || !window.arweaveWallet) return;
      loadedEvent();
    }, 1000);

    return () => window.removeEventListener("arweaveWalletLoaded", loadedEvent);
  }, []);

  const addressChange = (e: CustomEvent<{ address: string }>) => setAddress(e.detail.address);

  useEffect(() => {
    if (!address) return;
    window.addEventListener("walletSwitch", addressChange);

    return () => window.removeEventListener("walletSwitch", addressChange);
  }, [address]);

  async function connect() {
    try {
      await window.arweaveWallet.connect(permissions, { name: "ArPage" });
      const currentPerms = await window.arweaveWallet.getPermissions();
      const correctPerms = permissions.sort().toString() == currentPerms.sort().toString();
      if (!correctPerms) {
        await window.arweaveWallet.disconnect();
        if (currentPerms.length !== 0) setArconnectError('Re-connect with correct permissions.');
        return;
      }
      setArconnectError('');
      setAddress(await window.arweaveWallet.getActiveAddress());
    } catch(e) {
      console.log(e);
    }
  }

  async function disconnect() {
    try {
      await window.arweaveWallet.disconnect();
      setArconnectError('');
      setAddress(undefined);
    } catch {}
  }

  return [address, connect, disconnect, arconnectError];
};

export const arweave = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https"
});