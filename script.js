const userInput = document.getElementById("city-input");
const btn = document.getElementById("search");
const userLocation = document.getElementsByClassName("location")[0];
const temp = document.getElementsByClassName("temp")[0];
const info = document.getElementsByClassName("info");
const stat = document.getElementsByClassName("stat");

async function fetchWeather(city = "Mumbai") {
  let url = `https://wttr.in/${city}?format=j1`;
  try {
    let res = await fetch(url);
    let data = await res.json();
    let region = data.nearest_area[0].region[0].value;
    let country = data.nearest_area[0].country[0].value;
    let temp_C = data.current_condition[0].temp_C + '°';
    let FeelsLikeC = data.current_condition[0].FeelsLikeC;
    let min = data.weather[0].mintempC;
    let max = data.weather[0].maxtempC;
    let wDesc = data.current_condition[0].weatherDesc[0].value;
    let uvI = data.current_condition[0].uvIndex;
    let humidity = data.current_condition[0].humidity;
    let visi = data.current_condition[0].visibilityMiles;
    let windSpeed = data.current_condition[0].windspeedKmph;


    userLocation.classList.remove('skeleton', 'skeleton-text');
    temp.classList.remove('skeleton', 'skeleton-temp');
    [...info].forEach(i => i.classList.remove('skeleton', 'skeleton-text'));
    [...stat].forEach(s => s.classList.remove('skeleton', 'skeleton-text'));


    userLocation.innerHTML = `${city}, ${region}, ${country}`;
    temp.innerHTML = temp_C;
    info[0].innerHTML = `High: ${max}° Low: ${min}°`;
    info[1].innerHTML = wDesc;
    info[2].innerHTML = `RealFeel: ${FeelsLikeC}°`;
    info[3].innerHTML = `UV Index: ${uvI}`;
    stat[0].innerHTML = `<i class="fa-solid fa-temperature-three-quarters"></i> ${humidity}%`;
    stat[1].innerHTML = `<i class="fa-solid fa-eye"></i> ${visi} miles`;
    stat[2].innerHTML = `<i class="fa-solid fa-wind"></i> ${windSpeed} km/h`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


window.onload = () => fetchWeather();


btn.addEventListener("click", () => {
  let city = String(userInput.value).toLocaleUpperCase();
  if (city) {

    userLocation.classList.add('skeleton', 'skeleton-text');
    temp.classList.add('skeleton', 'skeleton-temp');
    [...info].forEach(i => {
      i.classList.add('skeleton', 'skeleton-text');
      i.innerHTML = ''; 
    });
    [...stat].forEach(s => {
      s.classList.add('skeleton', 'skeleton-text');
      s.innerHTML = ''; 
    });

    userLocation.innerHTML = ''; 
    temp.innerHTML = ''; 

    fetchWeather(city);
  }
});