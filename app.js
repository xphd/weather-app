const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
  .option({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);

    // lat, lng, callback  37.8267,-122.4233
    weather.getWeather(
      results.latitude,
      results.longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          // console.log(JSON.stringify(weatherResults, undefined, 2));
          console.log(
            `It's currently ${weatherResults.temperature}. It feels like ${
              weatherResults.apparentTemperature
            }`
          );
        }
      }
    );
  }
});
