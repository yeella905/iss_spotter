// const { fetchMyIP } = require('./iss_promised');

// fetchMyIP()
// .then((ip) => fetchCoordsByIP(ip))
// .then((coords) => fetchISSFlyOverTimes(coords))

// .then((body) => console.log(body));

// index2.js
const { nextISSTimesForMyLocation } = require('./iss_promised');

// see index.js for printPassTimes 
// copy it from there, or better yet, moduralize and require it in both files

// Call 
nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })