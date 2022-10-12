
import axios from "axios"

export default async function handler(req, res) {
  try {
    const data = await axios.get(`https://ark-api.decent.land/v1/oracle/state`)
    res.status(200).json(data.data)
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
  }
}