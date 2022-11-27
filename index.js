const { fetchIP } = require('./iss')


fetchIP((error, ip) => {
  if(error) {
    console.log("JS NOT ACCEPTED", error)
  } 
  console.log('WORKING... local IP:', ip)
})


