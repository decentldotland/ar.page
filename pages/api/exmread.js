import axios from "axios"
import { contractAddress } from './exmvars'

export default async function handler(req, res) {
  try {
    const data = await axios.get(`https://api.exm.dev/read/${contractAddress}`)
    res.status(200).json(data.data)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}