import { ethers } from "ethers";
import { EVM_ORACLES } from "../constants"; 
import ArkNetwork from "../assets/abi/ArkNetwork.json";
import { useNetwork } from 'wagmi';
import { useSigner } from 'wagmi';
import { useAccount } from 'wagmi';

export const useETH = () => {

  const { data: signer } = useSigner()
  const { address } = useAccount();
  const network = useNetwork();

  const createLinkIdentityContract = (chain: number) => {
      console.log("CHAIN RESULT: ", chain);
      const ArkContract = new ethers.Contract(
        EVM_ORACLES[chain],
        // @ts-ignore
        ArkNetwork.abi,
        signer
      );
      return ArkContract;
  }

  return {
    createLinkIdentityContract,
    network,
    address
  };
}



