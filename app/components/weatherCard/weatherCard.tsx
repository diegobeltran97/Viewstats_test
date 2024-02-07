import React from "react";
import styles from "./weatherCard.module.css";
import { fetchWeather, WeatherForecast } from "../../services/weatherService";
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

export const getWeatherAttributes = (condition: any) => {
  let attributes = {
    background: "",
    icon: faSun,
    color: "#FFD700",
  };

  switch (condition) {
    case "Clear":
      attributes.background = "/images/clear.png";
      attributes.icon = faSun;
      attributes.color = "#FFD700";
      break;
    case "Rain":
      attributes.background = "/images/rain.png";
      attributes.icon = faCloudRain;
      attributes.color = "#1E90FF";
      break;
    case "Snow":
      attributes.background = "/images/snow.png";
      attributes.icon = faSnowflake;
      attributes.color = "#FFFFFF";
      break;
    case "Clouds":
      attributes.background = "/images/clouds.png";
      attributes.icon = faCloud;
      attributes.color = "#808080";
      break;
    case "Haze":
    case "Mist":
      attributes.background = "/images/haze.png";
      attributes.icon = faSmog;
      attributes.color = "#696969";
      break;
    default:
      attributes.background = "/images/clear.png"; // Default background
      attributes.icon = faSun; // Default icon
      attributes.color = "#FFD700"; // Default color
      break;
  }

  return attributes;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  // Convert temperature from Kelvin to Celsius for display (adjust accordingly if you prefer Fahrenheit)
  const temp = data.main.temp - 273.15;
  const tempMin = data.main.temp_min - 273.15;
  const tempMax = data.main.temp_max - 273.15;

  const weatherMain = data.weather.length > 0 ? data.weather[0].main : "N/A";
  const weatherDescription =
    data.weather.length > 0 ? data.weather[0].description : "N/A";

  const { icon, color, background } = getWeatherAttributes(weatherMain);

  const isToday =
    new Date(data.dt * 1000).toDateString() == new Date().toDateString();

  return (
    <div
      className={styles.weatherCard}
      style={{
        width: isToday ? "100%" : "auto",
        border: isToday ? "none" : "auto",
        backgroundColor: isToday ? "#ecf0f1" : "auto",
        boxShadow: isToday ? "none" : "auto",

      }}
    >
      <div className={styles.weatherCardDescription}>
        <div className={styles.weatherCardTitle}>
          {!isToday ? new Date(data.dt * 1000).toDateString() : "Today"}
        </div>
        <div className={styles.weatherCardHeader}>
          <span className={styles.weatherCardHeaderTemperature}>
            {temp.toFixed(2)}°C
          </span>
        </div>

        <div className="column">
          <span style={{ fontSize: "14px", fontWeight: "500" }}>
            {weatherMain}
          </span>{" "}
          - <span style={{ fontSize: "14px" }}>{weatherDescription}</span>
        </div>
        <div className="column">
          <span className={styles.weatherCardTitle}>Min:</span>
          <span>{tempMin.toFixed(2)}°C</span>

          <span className={styles.weatherCardTitle}>Max</span>
          <span>{tempMax.toFixed(2)}°C</span>
        </div>
      </div>

      <div>
        <img
          src={background}
          style={{ width: isToday ? "10rem" : "40px" }}
        ></img>
      </div>
    </div>
  );
};

export default WeatherCard;
