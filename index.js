const { fetchCoordsByIP, fetchIP, fetchISSFlyoverTimes, nextISSTimesForLocation } = require('./iss');



fetchIP((error, ip) => {
  if (error) {
    console.log("JS NOT ACCEPTED", error);
  }
  console.log('WORKING... local IP:', ip);
});


fetchCoordsByIP('207.216.152.109', (error, data) => {
  if (error) {
    console.log("There was an Error", error.message);
  } else {
    console.log('you coordinates are', data);
  }
});


const newCoords = { latitude: '49.27670', longitude: '-123.13000' };


fetchISSFlyoverTimes(newCoords, (error, passes) => {
  if (error) {
    console.log("There was an Error", error.message);
    return;
  }
  console.log(`It worked! returned flyover times ${passes}`);
});

const printPassTimes = function(passes) {
  for (let pass = 0; pass > passes; pass++) {

  
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});