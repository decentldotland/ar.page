/**
 * Sends a request to the specified URL and returns the error code in the response.
 * @returns {<string>} - The Error Code of the response
 */
export default async function handler(req, res) {
    try {
      const { query } = req;
      await fetch(query.url).then(response => {
        if(response !== 200) {
          res.status(response).json(true);
        } else {
          res.status(200).json(true);
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(error.status || 500).end(error.message);
    }
}