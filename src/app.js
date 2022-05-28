const express = require('express');
const hbs = require('hbs')
const path = require('path')
const axios = require('axios')
const geocode = require ('./functions/geocode')
const temp = require ('./functions/temp')

const app = express();
const port = process.env.PORT || 3000
app.use(express.static(path.join(__dirname, '../public/')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views') )
hbs.registerPartials(path.join(__dirname, '../templates/partials'))


app.get('',(req, res)=>{
    res.render('index')
})
app.get('/about',(req, res)=>{
    res.render('about')
})

app.get('/weather',(req, mainRes)=> {
    if(req.query.s){
        geocode(req.query.s, (err,data)=>{
           temp(err, data, mainRes)
        })
    }else{
         mainRes.send({
            message: 'Provide a Location to get Weater info'
        })
    }
})



// app.get('/', (req, res)=>{
//     if(req.query.s){
//         const loc = req.query.s
//         geocode(loc, (err, data) => {
//             if(err){
//                 return res.send({
//                     error: err
//         })
//         } else{
//             if(data.found===false){
//                 return res.send({
//                 message: 'Place NOT found. Try another location'
//             })
//             }else{
//                 axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&units=metric&appid=e1bc1884bc3e485ff4bdaac7cc8963e0`)
//                 .then(response=>{
//                     res.send({
//                      temp: response.data.main.temp,
//                      feels: response.data.main.feels_like,
//                      place: data.place_name
//                     })
//             })
//             .catch(err=>{
//                 return res.send({
//                     error: err.message
//                 })
//             })
//         }
//     }
// })
//     } else {
        // res.send({
        //     message: 'Provide a Location to get Weater info'
        // })
//     }
// })

app.listen(port, ()=>{
    console.log('Listening on port '+port)
})

module.exports = app