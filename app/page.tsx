"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation'
import { getWeatherAttributes } from "./components/weatherCard/weatherCard";

const WeatherPage = () => {
  const [city, setCity] = useState("");
  const router = useRouter();

  const conditions = ["Clear", "Rain", "Snow", "Clouds", "Haze", "Mist"];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const {icon, color} =  getWeatherAttributes(randomCondition);
  
  

  

  const handleSearch = () => {
    // Navigate to the forecast page with the input as a query parameter
    router.push(`/forecast?city=${city}`);
  };

  const clearInput = () => {
    setCity('');
  };

  return (
    <div className={styles.main}>
      <div>
      <FontAwesomeIcon icon={icon} color={color} size="2x" />
      </div>
      <h1 className="title">The Weather App</h1>

      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
         {city && (
        <FontAwesomeIcon
          icon={faTimes}
          className={styles.clearIcon}
          onClick={clearInput}
        />
      )}
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.searchIcon}
        />
      </div>

      <button className={styles.button_search} onClick={handleSearch}>
        Search
      </button>
     
    </div>
  );
};

export default WeatherPage;
