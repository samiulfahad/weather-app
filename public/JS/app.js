console.log('git')
const input = document.getElementById('input');
const m2 = document.getElementById('m2')
const m1 = document.getElementById('m1')
const btn = document.getElementById('btn')
btn.addEventListener('click', (e)=>{
    m1.textContent = 'Loading....'
    m2.textContent = ''
    e.preventDefault();
    if(input.value===''){
        return m1.textContent = 'Please Enter an Address'
    }
    const url = 'http://localhost:3000/weather?s='+ input.value
    fetch(url).then(res=>
    res.json().then(data=>{
        m1.textContent = ""
        if(data.NOT_Found){
            m1.textContent = data.NOT_Found
        } else if(data.error){
            m1.textContent = data.error
        }else {
            m1.textContent = "Your Result:"
            m2.textContent = `temp: ${data.temp} & place: ${data.place}`
        }
        input.value = ''


    }))
})
