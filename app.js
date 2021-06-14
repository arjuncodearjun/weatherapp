// Getting the location

window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description')
  let temperatureDegree = document.querySelector('.temperature-degree')
  let locationCity = document.querySelector('.location-City')
  let temperatureSection = document.querySelector('.degree-section')
  const temperatureSpan = document.querySelector('.degree-section span')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //  console.log(long,lat)
      // const proxy = 'https://cors-anywhere.herokuapp.com/'
      const API = "10726d0321cc4eddfd6d4984451b4613";
      const api = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API}`;
      // console.log(api)
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const temperature  = data.main.temp;
          const summary  = data.weather[0].description;
          const city = data.name;
        //   Set DOM elements from the API
        temperatureDegree.textContent = Math.floor((temperature -273.15)*(9/5) +32 );
        temperatureDescription.textContent = summary;
        locationCity.textContent = city;
        // formula for Celsius
        let celsius = (temperature -273.15);

        // Change temp to Celsius/F
        temperatureSection.addEventListener('click', ()=>{
            if(temperatureSpan.textContent === "F"){
                temperatureSpan.textContent = "C";
                temperatureDegree.textContent = Math.floor(celsius);
            } else{
                temperatureSpan.textContent = "F";
                temperatureDegree.textContent = Math.floor(celsius * (9/5)+32);


            }
        })

        });
    });
  }




});
