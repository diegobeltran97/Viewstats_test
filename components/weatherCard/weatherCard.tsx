import React from "react";
import styles from "./weatherCard.module.css";
import { fetchWeather, WeatherForecast } from "../../app/services/weatherService";
import {
  faCloudRain,
  faSnowflake,
  faSun,
  faCloud,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface WeatherCardProps {
  data: WeatherForecast["list"][0]; // Use the type of a single item in the list
}

export const getWeatherIcon = (condition: any) => {
  switch (condition) {
    case "Clear":
      return faSun;
    case "Rain":
      return faCloudRain;
    case "Snow":
      return faSnowflake;
    case "Clouds":
      return faCloud;
    case "Haze":
    case "Mist":
      return faSmog;
    default:
      return faSun; // Default icon
  }
};

export const getWeatherIconColor = (condition: any) => {
  switch (condition) {
    case "Clear":
      return "#FFD700"; // Gold for sun
    case "Rain":
      return "#1E90FF"; // DodgerBlue for rain
    case "Snow":
      return "#FFFFFF"; // White for snow
    case "Clouds":
      return "#808080"; // Grey for clouds
    case "Haze":
    case "Mist":
      return "#696969"; // DimGrey for haze/mist
    default:
      return "#FFD700"; // Default color
  }
};

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  // Convert temperature from Kelvin to Celsius for display (adjust accordingly if you prefer Fahrenheit)
  const temp = data.main.temp - 273.15;
  const tempMin = data.main.temp_min - 273.15;
  const tempMax = data.main.temp_max - 273.15;

  const weatherMain = data.weather.length > 0 ? data.weather[0].main : "N/A";
  const weatherDescription =
    data.weather.length > 0 ? data.weather[0].description : "N/A";

  const icon = getWeatherIcon(weatherMain);
  const color = getWeatherIconColor(weatherMain)

  const isToday = new Date(data.dt * 1000).toDateString() == new Date().toDateString()

  return (
    <div className={styles.weatherCard} style={{ width:  isToday ? '100%': 'auto'   }} >
      <div className={styles.weatherCardTitle}>
        {  !isToday ? new Date(data.dt * 1000).toDateString() : 'Today'}
      </div>
      <div className={styles.weatherCardHeader}>
        <span className={styles.weatherCardHeaderTemperature}>{temp.toFixed(2)}°C</span>
        <span>
          <FontAwesomeIcon icon={icon} color={color} size="2x" />
        </span>
      </div>
      <div className={styles.weatherCardDescription}>
        <span style={{ fontSize: "14px", marginRight: "10px" }}>
          Min: {tempMin.toFixed(2)}°C
        </span>
        <span style={{ fontSize: "14px" }}>Max: {tempMax.toFixed(2)}°C</span>
      </div>
      <div>
        <span style={{ fontSize: "14px", fontWeight: "500" }}>
          {weatherMain}
        </span>{" "}
        - <span style={{ fontSize: "14px" }}>{weatherDescription}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
