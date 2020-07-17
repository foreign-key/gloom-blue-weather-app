import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();

export function convertTemperature(temp, tempScale, precision = 0) {
  temp = temp - 273.15;
  const formula = tempScale ? temp : temp * 1.8 + 32;
  return formula.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  });
}

export function tempScale(isCelcius) {
  return isCelcius ? env.REACT_APP_CELC : env.REACT_APP_FAHR;
}

export function tempColor(temp) {
  return {
    color: parseInt(temp) > 298 ? "#E74C3C" : "#3498DB",
  };
}

export function getCurrentDay(date) {
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
}

export function getExactTime() {
  const time = new Date().getTime();

  if (
    time > new Date().setHours(0, 0, 0) &&
    time < new Date().setHours(3, 0, 0)
  ) {
    return "3:00:00";
  } else if (
    time > new Date().setHours(3, 0, 0) &&
    time < new Date().setHours(6, 0, 0)
  ) {
    return "6:00:00";
  } else if (
    time > new Date().setHours(6, 0, 0) &&
    time < new Date().setHours(9, 0, 0)
  ) {
    return "9:00:00";
  } else if (
    time > new Date().setHours(9, 0, 0) &&
    time < new Date().setHours(12, 0, 0)
  ) {
    return "12:00:00";
  } else if (
    time > new Date().setHours(12, 0, 0) &&
    time < new Date().setHours(15, 0, 0)
  ) {
    return "15:00:00";
  } else if (
    time > new Date().setHours(15, 0, 0) &&
    time < new Date().setHours(18, 0, 0)
  ) {
    return "18:00:00";
  } else if (
    time > new Date().setHours(18, 0, 0) &&
    time < new Date().setHours(21, 0, 0)
  ) {
    return "21:00:00";
  } else if (
    time > new Date().setHours(21, 0, 0) &&
    time <= new Date().setHours(23, 59, 59)
  ) {
    return "0:00:00";
  }

  return null;
}
