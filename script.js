console.log("Hey start")
const yourWeatherDiv=document.querySelector(".your-location");
const searchWeather=document.querySelector(".searchWeather");
const key="ee63d52bf12acfb55f2b4ec3d16164f1";
const cityinfo=document.querySelector(".cityName-p");
const cityinfosearch=document.querySelector(".cityName-para")
const weatherType=document.querySelector(".weather-type");
const weatherTypesearch=document.querySelector(".weather-type-s")
const weatherImg=document.querySelector(".img");
const tempyourlocation=document.querySelector(".temperature");
const tempsearchlocation=document.querySelector(".tempsearch")
const divContainerYour=document.querySelector(".div-container");
const wind=document.querySelector(".wind");
const humidity=document.querySelector(".humidity");
const cloud=document.querySelector(".clouds");
var lat= 23.164543;
var longi=92.9375739;
const humidvalue=document.querySelector(".hpercent");
const humidsearch=document.querySelector(".humidsearch")
const windspeed=document.querySelector(".windmps");
const wspeed=document.querySelector(".wsearch")
const cloudvalue=document.querySelector(".cloud");
const  cloudvaluesearch=document.querySelector(".cloudsearch")
const inputTab=document.querySelector(".inputTab");
const flag=document.querySelector(".flag")
const flagy=document.querySelector(".flag-y");
const svgyour=document.querySelector("#svgyour");
const searchsvg=document.querySelector("#svgsearch");
function getCurrentPosition(){
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve,reject);
    });
}


async function getLocation(){
    try{
        const position =await getCurrentPosition();
        console.log(position,"hiiiiiiii");
        lat=position.coords.latitude;
        longi=position.coords.longitude;

    }catch(err){
        console.log(err);
    }
}

        //Locating your current postion 
getLocation();
async function yourlocationdata(){
    
    let p=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${key}`);   
   
    console.log(p);
    let data=await p.json();
    console.log(data);

    tempyourlocation.innerText=Math.round(data.main.temp-273.15)+"° Celcius";

    humidvalue.innerText=(data.main.humidity)+"%";
    
    windspeed.innerText=(data.wind.speed)+"m/s";

    cityinfo.innerText=(data.name  );
    flagy.src=`./image/png100px/${data.sys.country}.png`;
    // let ab=await fetch(`https://countryflagsapi.com/png/${data.sys.country}`);
    // flagy.src=ab.url;
    weatherType.innerText=data.weather[0].description;
    
    cloudvalue.innerText=data.clouds.all+"%";
}
async function yourWeather(){
    
    searchWeather.classList.remove("activate");
    searchWeather.classList.add("anti-activate");
    // svgyour.classList.
    yourWeatherDiv.classList.remove("activate")
    yourWeatherDiv.classList.add("anti-activate");
    svgyour.classList.remove("anti-activate")
    svgyour.classList.add("activate");

    console.log("middle");
    await yourlocationdata();

    svgyour.classList.remove("activate");
    svgyour.classList.add("anti-activate");
    yourWeatherDiv.classList.remove("anti-activate")
    yourWeatherDiv.classList.add("activate");

    console.log("activate")
}

 function searchWeatherfun(){
    yourWeatherDiv.classList.add("anti-activate");
    yourWeatherDiv.classList.remove("activate");
    searchWeather.classList.remove("anti-activate")
    searchWeather.classList.add("activate");
    inputTab.focus();
    console.log("activate");

    // now start
}
const rost=document.querySelector(".rest");
async function rest(){
   
    let cityName=inputTab.value;
    console.log(cityName);
    rost.classList.remove("activate");
    rost.classList.add("anti-activate");
    searchsvg.classList.remove("anti-activate")
    searchsvg.classList.add("activate");
    await searchLocation(cityName);

    searchsvg.classList.remove("activate")
    searchsvg.classList.add("anti-activate");
    rost.classList.remove("anti-activate");
    rost.classList.add("activate");
}
document.getElementById('inputid').onkeydown = function(e){
    if(e.keyCode == 13){
      rest();
    }
 };
async function searchLocation(cityName){
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    let p=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`);   
   
    console.log(p);
    let data=await p.json();
    console.log(data);

    tempsearchlocation.innerText=Math.round(data.main.temp-273.15)+"° Celcius";

    humidsearch.innerText=(data.main.humidity)+"%";
    
    wspeed.innerText=(data.wind.speed)+"m/s";

    cityinfosearch.innerText=(data.name  );
    flag.src=`./image/${data.sys.country}.png`;
    setTimeout(()=>{},200);
    // let ab=await fetch(`https://countryflagsapi.com/png/${data.sys.country}`);
    // flag.src=ab.url;

    weatherTypesearch.innerText=data.weather[0].description;
    
    cloudvaluesearch.innerText=data.clouds.all+"%";
    console.log(data.clouds.all);
}
window.getCurrentPosition=getCurrentPosition;
window.getLocation=getLocation;
window.yourlocationdata=yourlocationdata;
window.yourWeather=yourWeather;
window.searchWeatherfun=searchWeatherfun;
window.rest=rest;
window.searchLocation=searchLocation;

