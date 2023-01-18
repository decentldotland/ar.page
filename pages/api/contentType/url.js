/**
 * Sends a request to the specified URL and returns the 'Content-Type' header of the response.
 * @returns {<string>} - The 'Content-Type' header of the response.
 */
export default async function handler(req, res) {
  try {
    const { query } = req;
    const response = await fetch(query.url);
    const contentType = response.headers.get('Content-Type');
    res.status(200).json(contentType);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).end(error.message);
  }
}