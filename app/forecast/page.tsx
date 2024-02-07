"use client";
import { useEffect, useState, Suspense } from "react";
import { fetchWeather, WeatherForecast } from "../services/weatherService";
import { useSearchParams } from "next/navigation";
import WeatherCard from "@/app/components/weatherCard/weatherCard";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

// Import useRouter

const Forecast = () => {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("city"); // Access query parameters
  // Rest of your component logic that depends on `search`
  // ...
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
    return forecast &&  (
      <>
        <h1 className="title" style={{ width: "100%" }}>
          {search?.toUpperCase()}
        </h1>
        {forecast.list.map((day, index) => {
          const dateString = new Date(day.dt * 1000).toDateString();
          if (dateString !== dayEvent) {
            dayEvent = dateString;
            return <WeatherCard key={index} data={day} />;
          }
          return null;
        })}
      </>
    ) 
  };
  return (
    <>{listDayForecast()}</>


  );
};

const ForecastPage = () => {
  const router = useRouter(); 
  return (
    <div className={styles.main}>
      <div className={styles.container}>
      
        <div className={styles.backButton}>
          <button  onClick={() => router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} fontSize="2rem" /> 
          </button>
        </div>

        <h1 className="title">Weather Forecast:</h1>

        <div className={styles.cardListContainer}>
          <Suspense fallback={<div>Loading...</div>}>
            <Forecast></Forecast>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ForecastPage;
