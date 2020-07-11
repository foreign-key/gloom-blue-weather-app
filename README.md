# GloomBlue
A simple weather app created using React.JS that displays the weather information based on the inputted city name. It consumes data from [OpenWeatherMap](https://openweathermap.org/) and uses `https://datahub.io/core/country-list` to convert country code based on 2 digit codes (ISO 3166-1) into their full name. Map can also be displayed (provided by [react-leaflet](https://react-leaflet.js.org/)) base on the geo coordinates of the city.

## Live Demo
[GloomBlue](https://gloom-blue-weather-app.herokuapp.com/) on Heroku

## Instructions

1. Navigate to [repo](https://github.com/foreign-key/gloom-blue-weather-app)
2. Clone locally using
   `$ git clone https://github.com/foreign-key/gloom-blue-weather-app.git` or download ZIP file
3. Enjoy!

## Notes

+ To be able to run the app, an **API key** must be supplied from `https://openweathermap.org/`.
+ Currently, it just supports searching by city name.

## Future Updates
+ ~~Integrate maps based on the geo coordinates fetched from the server~~
+ ~~Display weather details based on device's location~~
+ ~~Display icons based on the weather of the inputted location~~
+ ~~Make some changes on the UI~~
+ 5-day forecast
