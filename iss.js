/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */



const request = require("request")



const fetchIP = callback => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null)

    if (response.statusCode !== 200) {
      callback(Error(`Status.. ${response.statusCode}.. your local IP: ${body} `), null)
      return
    }
     
      const data = JSON.parse(body).ip
     callback(null, data)
    
  })
};


module.exports = { fetchIP }



 //(error, body) => {
  //    if(error) {
  //      return null;
  //    } else {
  //       const data =
  //       console.log(data)
  //    }