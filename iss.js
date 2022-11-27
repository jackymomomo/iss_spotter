/**;
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188";
 */



const request = require("request");



const fetchIP = callback => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status.. ${response.statusCode}.. your local IP: ${body} `), null);
      return;
    }
    const data = JSON.parse(body).ip;
    callback(null, data);

  });
};




const fetchCoordsByIP = (data, callback) => {
  request(`http://ipwho.is/${data}`, (error, response, body) => {
    if (error) return callback(error, null);

    const parsedBod = JSON.parse(body);

    if (!parsedBod.success) {
      const message = `Status.. ${parsedBod.success}.. your local Message: ${parsedBod.message} `;
      callback(Error(message), null);
      return;
    }
    const { latitude, longitude } = parsedBod;
    callback(null, { latitude, longitude });
  });
};



const fetchISSFlyoverTimes = (coords, callback) => {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status: ${response.statusCode}, ISS pass times ${body} `), null);
      return;
    }

    const passes = console.log(JSON.parse(body).response);
    callback(null, passes);
  });
};


const nextISSTimesForLocation = function(Callback) {
  fetchIP((error, ip) => {
    if (error) {
      return Callback(error, null);
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        return Callback(error, null);
      }
    
      fetchISSFlyoverTimes(data, (error, passes) => {
        if (error) {
          return Callback(error, null);
        }
        Callback(null, passes);
      });
    });
  });
};




module.exports = { fetchCoordsByIP, fetchIP, fetchISSFlyoverTimes, nextISSTimesForLocation };
