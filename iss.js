const needle = require('needle');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchCoordsByIP = function(ip, callback) {
    needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
  
      if (error) {
        callback(error, null);
        return;
      }
  
      if (!body.success) {
        const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
        callback(Error(message), null);
        return;
      } 
  
      const latitude = body.latitude
      const longitude = body.longitude
      callback(null, {latitude, longitude});
    });
  };
  
  // Don't need to export the other function since we are not testing it right now.
  module.exports = { fetchCoordsByIP };