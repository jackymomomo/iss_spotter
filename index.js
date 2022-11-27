const { fetchCoordsByIP, fetchIP } = require('./iss')



fetchIP( (error, ip) => {
  if(error) {
    console.log("JS NOT ACCEPTED", error)
  } 
  console.log('WORKING... local IP:', ip)
})


fetchCoordsByIP('207.216.152.109', (error, data) => {
  if(error){
    console.log(error.message)
  } else {
    console.log('you coordinates are', data)
  }
})
