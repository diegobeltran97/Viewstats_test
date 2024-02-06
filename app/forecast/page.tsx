"use client";
import { useEffect, useState } from "react";
import { fetchWeather, WeatherForecast } from "../services/weatherService";
import { useSearchParams } from "next/navigation";
import WeatherCard from "@/components/weatherCard/weatherCard";
import styles from "./page.module.css";
const ForecastPage = () => {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("city");


  useEffect(() => {
    if (search) {
      const loadForecast = async () => {
        const data = await fetchWeather(search);
        console.log("data", data);

        if (data) {
          setForecast(data); // Take the first 5 days of forecast
        }
      };
      loadForecast();
    }
  }, [search]);

 

  const listDayForecast = () => {
    let dayEvent = "";
    return forecast ? (
      forecast.list.map((day, index) => {
        const dateString = new Date(day.dt * 1000).toDateString();
        if (dateString !== dayEvent) {
          dayEvent = dateString;
          return <WeatherCard key={index} data={day} />;
        }
        return null;
      })
    ) : (
      <p>No forecast available</p>
    );
  }; 

  return (
    <div className={styles.main}>
     <div className={styles.container}>
      <h1 className="title">Weather Forecast:</h1>
      <h2>{search?.toUpperCase()}</h2>
      
      <div className={styles.cardListContainer}>
        {listDayForecast()}
      </div>      
    </div> 
    </div>
    
  );
};

export default ForecastPage;
