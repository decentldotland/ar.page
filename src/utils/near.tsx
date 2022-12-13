import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Buffer } from 'buffer';

import { map, distinctUntilChanged } from "rxjs";
import { providers, utils } from "near-api-js";
import type {
  AccountView,
  CodeResult,
} from "near-api-js/lib/providers/provider";
import type { Transaction, WalletSelector, AccountState } from "@near-wallet-selector/core";
import { setupWalletSelector } from "@near-wallet-selector/core";
import {  WalletSelectorModal, setupModal } from "@near-wallet-selector/modal-ui";

import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import "@near-wallet-selector/modal-ui/styles.css";
import { NEAR_ORACLE } from "../constants";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";

const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;

export const useNear = () => {

    const [selector, setSelector] = useState<WalletSelector | null>(null);
    const [modal, setModal] = useState<WalletSelectorModal | null>(null);
    const [accountNear, setAccountNear] = useState<any>(null);
    const [accounts, setAccounts] = useState<Array<AccountState>>([]);
    const [loadingNear, setLoadingNear] = useState<boolean>(false);

    const accountId = accounts.find((account) => account.active)?.accountId || null;

    const init = useCallback(async () => {
        const _selector = await setupWalletSelector({
          network: 'mainnet',
          //debug: true,
          modules: [
            ...(await setupDefaultWallets()),
            setupNearWallet(),
            setupSender(),
            setupMeteorWallet(),
          ],
        });
        const _modal = setupModal(_selector, { contractId: NEAR_ORACLE });
        const state = _selector.store.getState();
        setAccounts(state.accounts);
        setSelector(_selector);
        setModal(_modal);
      }, []);

    const getAccount = useCallback(async (): Promise<any | null> => {
        if (!accountId || !selector) return null;

        const { network } = selector.options;
        const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

        return provider
            .query<AccountView>({
            request_type: "view_account",
            finality: "final",
            account_id: accountId,
            })
            .then((data) => ({
            ...data,
            account_id: accountId,
            }));
    }, [accountId, selector?.options]);

    const linkNear = useCallback(
        async (arweave_addr: string, customAccountId='') => {
          if (!accountId || !selector) throw new Error("No account selected");
          const wallet = await selector.wallet();
          return wallet
            .signAndSendTransaction({
              signerId: accountId!,
              actions: [
                {
                  type: "FunctionCall",
                  params: {
                    methodName: "set_id",
                    args: { arweave_addr: arweave_addr },
                    gas: BOATLOAD_OF_GAS,
                    deposit: '0', // utils.format.parseNearAmount(donation)!,
                  },
                },
              ],
            })
            .catch((err: any) => {
              alert("Failed to link account: " + err);
              console.log("Failed to link account: ", err);
              throw err;
            });
    },[selector, accountId]);

  /**
    * Checks if the user has linked their account on Near
    * @returns {object} The `result` property inside is an array buffer, that if converted is either a null or a 43 (or 45) character-long txid
  */
   const checkNearLinking = useCallback((customAccountId='') => {
        if (!accountId || !selector) throw new Error("No account selected");
        const { network } = selector.options;
        const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

        return provider
        .query<CodeResult>({
            request_type: "call_function",
            account_id: NEAR_ORACLE,
            method_name: "get_id",
            args_base64: Buffer.from(accountId).toString("base64"),
            finality: "optimistic",
        })
        .catch((err: any) => {
            throw err;
        })
        .then((res) => {
            console.log(res, String.fromCharCode.apply(null, res.result));
            return String.fromCharCode.apply(null, res.result);
        }); 
    }, [selector]);
    //{ account_id: customAccountId || accountId }
    
    useEffect(() => {
        if (!accountId) {
          return setAccountNear(null);
        }
    
        setLoadingNear(true);
    
        getAccount().then((nextAccount) => {
          setAccountNear(nextAccount);
          setLoadingNear(false);
        });
    }, [accountId, getAccount]);
    

    useEffect(() => {
        init().catch((err: any) => {
          console.error(err);
          alert("Failed to initialise wallet selector");
        });
    }, [init]);

  
    useEffect(() => {
        if (!selector) {
          return;
        }
        const subscription = selector.store.observable
          .pipe(
            map((state) => state.accounts),
            distinctUntilChanged()
          )
          .subscribe((nextAccounts) => {
            setAccounts(nextAccounts);
          });
    
        return () => subscription.unsubscribe();
      }, [selector]);
      

    return {modal, selector, accounts, accountNear, accountId, loadingNear, linkNear, checkNearLinking, setAccountNear, setAccounts };
}