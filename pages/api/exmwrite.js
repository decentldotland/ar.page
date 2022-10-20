import axios from "axios"
import { token, contractAddress } from './exmvars'

export default async function handler(req, res) {
  try {
    const data = await axios.post(`https://api.exm.dev/api/transactions?token=${token}`, {
      functionId: contractAddress,
      inputs: [{
        "input": JSON.stringify({function: "reserve", evm_address: req.body.evm_address, ans: req.body.ans})
      }],
    }, {})
    res.status(200).json(data.data)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}