const axios = require('axios')
const temp = require('./temp')
const geocode = async (loc, callback) => {
    const data = {
                lon: 0,
                lat: 0,
                place_name: '',
                found: false,
                errMessage: undefined
            }
     try{
            const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?limit=1&access_token=pk.eyJ1Ijoic2FtaXVsMTIzIiwiYSI6ImNsMGM0dzZ1ejBla2QzY21qZnZzbXYxMGwifQ.zH-1GrLYGe4DZ6u1tcBB6Q`);
            if(res.data.features.length===0){
                return callback(data)
            }else{
                data.found = true,
                data.lon = res.data.features[0].center[0];
                data.lat = res.data.features[0].center[1];
                data.place_name = res.data.features[0].place_name;
                callback(data)
            }
    }
     catch (e) {
        if (e.code==='ENOTFOUND') {
            data.errMessage = 'Unable to Access Internet';
           return callback(data)
        } else {
            data.errMessage = 'API URL Error'
            console.log(e)
            return callback(data)
        }
     }
}

module.exports = geocode;