import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();

convertTemperature = (temp, tempScale) => {
  const newTemp = temp - 273.15;
  const formula = tempScale && newTemp * 1.8 + 32;
  return formula.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
};

tempScale = (isCelcius) =>
  isCelcius ? env.REACT_APP_CELC : env.REACT_APP_FAHR;

tempColor = (temp) => {
  color: parseInt(temp) > 298 ? "#E74C3C" : "#3498DB";
};

getCurrentDay = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
};

getExactTime = () => {
  const time = new Date().getTime();

  if (
    time > new Date().setHours(0, 0, 0) &&
    time <= new Date().setHours(6, 0, 0)
  ) {
    return "6:00:00";
  } else if (
    time > new Date().setHours(6, 0, 0) &&
    time <= new Date().setHours(12, 0, 0)
  ) {
    return "12:00:00";
  } else if (
    time > new Date().setHours(12, 0, 0) &&
    time <= new Date().setHours(18, 0, 0)
  ) {
    return "18:00:00";
  } else if (
    time > new Date().setHours(18, 0, 0) &&
    time <= new Date().setHours(23, 59, 59)
  ) {
    return "21:00:00";
  }

  return null;
};

filteredForecast = (forecastList) => {
  return forecastList.map((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (
      Date.parse(date) >= Date.parse(getDate()) &&
      dateParser(item.dt_txt) === dateParser(`${date} ${getExactTime()}`)
    ) {
      return item;
    }
    return false;
  });
};

dateParser = (date) => Date.parse(new Date(date.replace(" ", "T")));

getDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth().toString().length === 1 ? "0" : ""
  }${date.getMonth() + 1}-${date.getDate()}`;
};
