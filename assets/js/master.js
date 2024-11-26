const weatherApp = document.querySelector('.weatherapp')
const temp = document.querySelector('.temp')
const dateApp = document.querySelector('.date')
const timeApp = document.querySelector('.time')
const conditionApp = document.querySelector('.condition')
const nameApp = document.querySelector('.name')
const icon = document.querySelector('.icon')
const cloud = document.querySelector('.cloud')
const humidity = document.querySelector('.Humidity')
const wind = document.querySelector('.wind')
const form = document.querySelector('.form')
const search = document.querySelector('.search')
const searchI= document.querySelector('.searchI')
const cities = document.querySelectorAll('.city')


///////////////default cities/////

let cityInput='Tehran';
cities.forEach((val)=>{
    val.addEventListener('click',(e)=>{
        cityInput = e.target.innerHTML
        fetchWeatherData()
        weatherApp.style.opacity='0'
    })
})
///////////////////search input/////////
searchI.addEventListener('click',(e)=>{

    if(search.value.length==0){

        alert('please enter the city')

    }else{

        cityInput=search.value
        fetchWeatherData()
        search.value=''
        weatherApp.style.opacity='0'
    }
    e.preventDefault()
})
////////////////////

function dayOfWeek(day, month, year) {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return week[new Date(`${year}-${month}-${day}`).getDay()];
}
/////////////////////

function fetchWeatherData(){
    fetch('https://api.weatherapi.com/v1/current.json?key=e8a88f54ac554652abe135348242511&q='+cityInput)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);

        temp.innerHTML=data.current.temp_c + "&#176;"
        conditionApp.innerHTML=data.current.condition.text
        nameApp.innerHTML=data.location.name
        /////////////////date &  time//////
        const date = data.location.localtime
        const y = parseInt(date.substr(0,4))
        const m = parseInt(date.substr(5,2))
        const d = parseInt(date.substr(8,2))
        const time=date.substr(11);
        

        dateApp.innerHTML=`${dayOfWeek( d , m , y )} ${ d }  -  ${ m } -  ${ y }`;
        timeApp.innerHTML=time
        ////////////////////////////////////////////
        icon.src = "https:" + data.current.condition.icon

        cloud.innerHTML=data.current.cloud +" %"
        humidity.innerHTML=data.current.humidity+" %"
        wind.innerHTML=data.current.wind_kph + " km/h"
        /////////////////////background check///////
        let timOfDay="day"

        const code = data.current.condition.code
        if(!data.current.is_day){
            timOfDay='night'
        }
        if(code==1000){
            weatherApp.style.backgroundImage=`url(./assets/img/${timOfDay}/clear.jpg)`
        }else if(
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282
        ){
            weatherApp.style.backgroundImage=`url(./assets/img/${timOfDay}/cloudy.jpg)`
        }else if(
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1252 
        ){
            weatherApp.style.backgroundImage=`url(./assets/img/${timOfDay}/rainy.jpg)`
        }else{
             weatherApp.style.backgroundImage=`url(./assets/img/${timOfDay}/snowy.jpg)`
        }
        weatherApp.style.opacity='1'
    })
    .catch(()=>{
        alert('city not found')
         weatherApp.style.opacity='1'
    })
}
fetchWeatherData()
 weatherApp.style.opacity='1'