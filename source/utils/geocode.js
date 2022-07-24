//This API is to fetch the location using the position stack API
const request = require('request')
//Adding callBack
const geoCode = (location, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=3f51369acfd33ae687b53d1b43139a4b&query=${location}`
    // request({url, json: true}, (error, response) => { //Destructuring response to body, since it's an object
    request({url, json: true}, (error, {body}) => {  //Calling body from within response
        if(error){
            callback("Couldn't Connect To Service at the Moment.", undefined)
        }
        else if(body.error || body.data.length === 0) { //If response has error like user inputting something unusual then...
            callback("This location is invalid. Please re-check the name.", undefined)
        }
        else{
            callback(undefined, {
                lat: body.data[0].latitude, 
                lon: body.data[0].longitude,
                loc: body.data[0].label
                //Lat, Lon, Name calling done from here
            })
        }
    })
}

module.exports = geoCode