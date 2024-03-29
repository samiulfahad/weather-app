const input = document.getElementById('input');
const m2 = document.getElementById('m2')
const m1 = document.getElementById('m1')
const btn = document.getElementById('btn')
let myInput = document.getElementById("input");

myInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("btn").click();
  }
});


btn.addEventListener('click', (e)=>{
    m1.textContent = 'Loading....'
    m2.textContent = ''
    e.preventDefault();
    if(input.value==='' ){
        return m1.textContent = 'Please Enter an Address'
    }
    // http://localhost:3000
    const url = 'https://sfahad-weather-app.herokuapp.com/weather?s='+ input.value
    fetch(url).then(res=>
    res.json().then(data=>{
        m1.textContent = ""
        if(data.NOT_Found){
            m1.textContent = data.NOT_Found
        } else if(data.errMessage){
            m1.textContent = data.errMessage
        }else {
            m1.textContent = "Your Result:"
            m2.innerHTML = `Current Temperature is ${data.temp} deg <br>
            Place: ${data.place} <br>`
        }
        input.value = ''


    }))
})