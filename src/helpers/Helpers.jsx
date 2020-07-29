import moment from "moment";

export const convertTemperature = (temp, tempScale) => {
  temp = temp - 273.15;
  const formula = tempScale ? temp : temp * 1.8 + 32;
  return formula.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
};

export const tempScale = (isCelcius) =>
  isCelcius ? process.env.REACT_APP_CELC : process.env.REACT_APP_FAHR;

export const tempColor = (temp) => {
  return { color: parseInt(temp) > 298 ? "#E74C3C" : "#66CCFF" };
};

export const getCurrentDay = (date) =>
  moment(date, "YYYY-MM-DD HH:mm:ss").format("dddd");

export const getExactTime = () => {
  const time = new Date().getTime();

  if (
    time > new Date().setHours(0, 0, 0) &&
    time <= new Date().setHours(6, 0, 0)
  ) {
    return "06:00:00";
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

export const filteredForecast = (forecastList) => {
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

export const dateParser = (date) =>
  Date.parse(new Date(date.replace(" ", "T")));

export const getDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth().toString().length === 1 ? "0" : ""
  }${date.getMonth() + 1}-${date.getDate()}`;
};
