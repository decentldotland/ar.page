import { PermissionType } from "arconnect";
import { useEffect, useState } from "react";
import Arweave from "arweave";

const permissions: PermissionType[] = [
  "ACCESS_ADDRESS",
  "ACCESS_ALL_ADDRESSES",
  "SIGN_TRANSACTION"
];

type Hook = [string | undefined, () => Promise<void>, () => Promise<void>];

export const useArconnect = () => {
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    let apiInjected = false;

    const loadedEvent = async () => {
      if (address) return;
      apiInjected = true;

      try {
        const addr = await window.arweaveWallet.getActiveAddress();

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

//   async function connect() {
//     try {
//       await window.arweaveWallet.connect(permissions, { name: "Ark Protocol" });
//       setAddress(await window.arweaveWallet.getActiveAddress());
//     } catch {
//       downloadWalletModal.setState(true)
//     }
//   }

  async function disconnect() {
    try {
      await window.arweaveWallet.disconnect();
      setAddress(undefined);
    } catch {}
  }

  return [address, disconnect];
};

export const arweave = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https"
});