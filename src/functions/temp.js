const { default: axios } = require("axios");
const geocode = require('./geocode')
const temp = (err, data, mainRes) => {
    if(err){
        return mainRes.send({
            error: err
        })
    } else{
        if(data.found===false){
            return mainRes.send(
                {
                NOT_Found: 'Place NOT Found. Pleasy try another search'
            }
            )
        }else{
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=e1bc1884bc3e485ff4bdaac7cc8963e0`)
            .then(res=>{
            let sunrise = new Date( res.data.sys.sunrise *1000).toLocaleString('en-US', { hour: 'numeric', minute:'numeric', hour12: true })
            let sunset = new Date( res.data.sys.sunset *1000).toLocaleString('en-US', { hour: 'numeric', minute:'numeric', hour12: true })
            //document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
            return mainRes.send({
                temp: res.data.main.temp,
                feels: res.data.main.feels_like,
                place: data.place_name,
                sunrise,
                sunset
            })
        
            })
            .catch(err=>{
                return mainRes.send({
                    error: err
                })
            })


        }
    }
}

//geocode('Bhaluka', temp)
module.exports = temp;