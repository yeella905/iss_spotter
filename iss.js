const needle = require('needle');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// const fetchCoordsByIP = function(ip, callback) {
//     needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
  
//       if (error) {
//         callback(error, null);
//         return;
//       }
  
//       if (!body.success) {
//         const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
//         callback(Error(message), null);
//         return;
//       } 
  
//       const latitude = body.latitude
//       const longitude = body.longitude
//       callback(null, {latitude, longitude});
//     });
//   };

// const fetchISSFlyOverTimes = function(coords, callback) {
//     const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
//     needle.get(url, (error, response, body) => {
//       if (error) {
//         callback(error, null);
//         return;
//       }
  
//       if (response.statusCode !== 200) {
//         callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
//         return;
//       }
  
//       const passes = body.response;
//       callback(null, passes);
//     });
//   };
  
const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
      if (error) {
        return callback(error, null);
      }
  
      fetchCoordsByIP(ip, (error, loc) => {
        if (error) {
          return callback(error, null);
        }
  
        fetchISSFlyOverTimes(loc, (error, nextPasses) => {
          if (error) {
            return callback(error, null);
          }
  
          callback(null, nextPasses);
        });
      });
    });
  };
  
// Only export nextISSTimesForMyLocation and not the other three (API request) functions.
// This is because they are not needed by external modules.
module.exports = { nextISSTimesForMyLocation };