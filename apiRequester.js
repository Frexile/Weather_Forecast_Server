const fetch = require("node-fetch");

class ApiRequester {
    constructor(){
        this.key = process.env.API_KEY;
        this.host = process.env.API_HOST;
        this.urlSample = "https://weatherapi-com.p.rapidapi.com/current.json?q=";
    }

    async getResponse(cityIdentifier) {
        console.log(cityIdentifier)
        const response = await fetch(this.urlSample + cityIdentifier, {
          method: "GET",
          headers: {
            "x-rapidapi-key": this.key,
            "x-rapidapi-host": this.host,
          },
        });
      
        return response.json();
    }
}

module.exports = ApiRequester;