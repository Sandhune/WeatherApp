window.addEventListener('load',()=>{
let long;
let lat;
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezones");
let temperatureClick = document.querySelector(".temperature-section");
let temperatureSpan = document.querySelector(".degree-section span");
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(position =>{

 long = position.coords.longitude;
 lat = position.coords.latitude;
 const proxy = "https://cors-anywhere.herokuapp.com/";
 const api = `${proxy}https://api.darksky.net/forecast/0583c82d6542218f553631179e367be9/${lat},${long}`;
 fetch(api)
    .then(Response =>{
      return Response.json();
 })

     .then(data =>{
       console.log(data)
        const {temperature,summary,icon} = data.currently;
        //Set DOM elements from the API
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        //set to celsius
        let celsius = (temperature-32)*(5/9);
        // Set Icons
        setIcons(icon,document.querySelector(".icon"));
        // Change Celsius/Fahrenheit
        temperatureClick.addEventListener('click', ()=>{
           if( temperatureSpan.textContent ==="F"){
               temperatureSpan.textContent ="C";
               temperatureDegree.textContent = Math.floor(celsius);
           }else{
               temperatureSpan.textContent ="F";
               temperatureDegree.textContent = temperature;
           }
        })
    });
});
}
function setIcons(icon, iconID){
    const skycons = new Skycons({color:"white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,currentIcon);
}
});