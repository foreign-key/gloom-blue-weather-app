const sendRequest = async (url = "") => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};

// export const queryCountries = () => {
//   return sendRequest(
//     "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json"
//   );
// };

export const queryForecast = (queryString) => {
  return sendRequest(
    `https://api.openweathermap.org/data/2.5/forecast?${queryString}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
  );
};
