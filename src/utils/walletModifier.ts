  /**
   * Formatting wallet to omit majority of string
   * @param { string } walletId - Wallet address
   * @param { number } initalLen - Max number for substring 2nd arg, first part of wallet
   * @param { number } endLen - max number for substring 2nd arg, last part of wallet
   * @returns { string } - containing shortened wallet address
   */
   export const walletModifier = (walletId: string | undefined, initialLen: number, endLen: number) => {
    // check if wallet Id exists and if above 11 chars
    if(walletId) {
        if (walletId.length <= 11) {
            return walletId;
        }
        const start = walletId.substring(0, initialLen);
        const end = walletId.substring(walletId.length - endLen);
        return `${start}....${end}`;
    } else {
        return "....";
    }
  };