import { ArweaveTransaction } from "../types";

// write all the social events here
export function arweaveTransactionHandler (transaction: ArweaveTransaction): string {
  const tags = transaction.tags
  const appNames = tags.map(tag => tag.name === "App-Name" ? tag.value : '').filter(tag => tag !== '')
  if (appNames.length > 0 && appNames[0].length) return appNames[0];
  return "Unknown App";
}
