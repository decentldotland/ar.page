import axios from "axios"
import { contractAddress } from './exmvars'

export default async function handler(req, res) {
  const token = process.env.EXM_TOKEN;
  try {
    const data = await axios.post(`https://api.exm.dev/api/transactions?token=${token}`, {
      functionId: contractAddress,
      inputs: [{
        "input": JSON.stringify({
          ...req.body
        }),
        "tags": [
          {
            name: "Protocol-Name",
            value: "Ark-Network"
          },
          {
            name: "Protocol-Action",
            value: "Link-Identity"
          }
        ]
      }],
    }, {})
    res.status(200).json(data.data)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}