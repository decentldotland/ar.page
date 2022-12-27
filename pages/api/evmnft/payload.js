import axios from "axios";

/**
 * @Note evmnft supports {eth, polygon, bsc, fantom, avax, evmos}
 */

export default async function handler(req, res) {
  // Retrieve dynamic query variable
  const { query } = req;
  const EVMNFT_ENDPOINT = `https://ark-core.decent.land/v2/evm-nft/arweave/${query.chain}/${query.arweaveAddr}`;

  try {
    const data = await axios.get(EVMNFT_ENDPOINT);
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }

}