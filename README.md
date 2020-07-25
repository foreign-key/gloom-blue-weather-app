# GloomBlue
A simple weather app created using React.JS that displays the weather information based on the inputted city name. It consumes data from [OpenWeatherMap](https://openweathermap.org/) and uses `https://datahub.io/core/country-list` to convert country code based on 2 digit codes (ISO 3166-1) into their full name. Map can also be displayed (provided by [react-leaflet](https://react-leaflet.js.org/)) base on the geo coordinates of the city.

## Live Demo
[GloomBlue](https://gloomblue.netlify.app/) on Netlify

## Instructions

1. Navigate to [repo](https://github.com/foreign-key/gloom-blue-weather-app)
2. Clone locally using
   `$ git clone https://github.com/foreign-key/gloom-blue-weather-app.git` or download ZIP file
3. `npm install`
4. `npm start`
5. Enjoy!

## Notes

+ To be able to run the app, an **API key** must be supplied from `https://openweathermap.org/`.
+ Currently, it just supports searching by city name.

## Current Features
+ Maps can be displayed based on the geo coordinates fetched from the server
+ Display weather details based on device's location
+ Display icons based on the weather of the inputted location
+ Display loading screen when sending request to server
+ User can save a bookmark of the location previously searched and ability to go back and forward to the app
+ 5-day forecast

## Future Updates
+ ~~Integrate maps based on the geo coordinates fetched from the server~~
+ ~~Display weather details based on device's location~~
+ ~~Display icons based on the weather of the inputted location~~
+ ~~Added loading screen when sending request to server~~
+ ~~Save a bookmark of the location previously searched and ability to go back and forward to the app~~
+ ~~Make some changes on the UI~~
+ ~~5-day forecast~~
