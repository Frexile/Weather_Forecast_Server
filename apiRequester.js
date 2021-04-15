const fetch = require("node-fetch");

class ApiRequester {
  constructor(){
      this.key = process.env.API_KEY;
      this.host = process.env.API_HOST;
      this.urlSample = "https://weatherapi-com.p.rapidapi.com/current.json?q=";
  }

  async simlifyJsonData(jsonData){
    const {location, current} = jsonData;

    let resJson = {
      cityName : location.name,
      coords : {
        lat : location.lat,
        lon : location.lon
      },
      temp : current.temp_c,
      icon : current.condition.icon.replace(/64x64/i, '128x128'),
      wind : current.wind_mph,
      windDir : current.wind_dir,
      pressure : current.pressure_mb,
      humidity : current.humidity,
      cloud : current.cloud
    }

    return resJson;
  }

  async getResponse(cityIdentifier) {
      
      const response = await fetch(this.urlSample + cityIdentifier, {
        method: "GET",
        headers: {
          "x-rapidapi-key": this.key,
          "x-rapidapi-host": this.host,
        },
      });
      
      let json = await response.json();
      return this.simlifyJsonData(json);
  }
}

module.exports = ApiRequester;