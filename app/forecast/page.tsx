"use client";
import { useEffect, useState } from "react";
import { fetchWeather, WeatherForecast } from "../services/weatherService";
import { useSearchParams } from "next/navigation";
import WeatherCard from "@/app/components/weatherCard/weatherCard";
import styles from "./page.module.css";
const ForecastPage = () => {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("city");
  let dayEvent = "";

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

  if (!forecast) {
    return <div>Loading...</div>;
  }

  const listDayForeCast = forecast.list.map((day, index) => {
    if ( new Date(day.dt * 1000).toDateString() !== dayEvent  ) {
        dayEvent = new Date(day.dt * 1000).toDateString(); 
        return  <WeatherCard key={index} data={day} />; 
    }
    
  });

  return (
    <div className={styles.main}>
     <div className={styles.container}>
      <h1 className="title">Weather Forecast:</h1>
      <h2>{search?.toUpperCase()}</h2>
      
      <div className={styles.cardListContainer}>
        {listDayForeCast}
      </div>      
    </div> 
    </div>
    
  );
};

export default ForecastPage;
