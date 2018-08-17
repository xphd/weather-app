// c275481f200225e5e202dcf5307ceabd
const request = require("request");

var getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/c275481f200225e5e202dcf5307ceabd/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to Forecase.io server");
      } else if (response.statusCode === 400) {
        callback("Unable to fetch weather");
      } else if (response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    }
  );
};

module.exports.getWeather = getWeather;
