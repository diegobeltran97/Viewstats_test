"use client";
import { useEffect, useState, Suspense } from "react";
import { fetchWeather, WeatherForecast } from "../services/weatherService";
import { useSearchParams } from "next/navigation";
import WeatherCard from "@/app/components/weatherCard/weatherCard";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft , faPooStorm , faCloud} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

// Import useRouter

const Forecast = () => {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const searchParams = useSearchParams();
  const search = searchParams.get("city");

  useEffect(() => {
    if (search) {
      setLoading(true); // Start loading
      const loadForecast = async () => {
        try {
          const data = await fetchWeather(search);
          if (data) {
            setForecast(data); // Update the forecast state
          }
        } catch (error) {
          console.error("Failed to fetch weather data:", error);
        } finally {
          setLoading(false); // Stop loading regardless of outcome
        }
      };
      loadForecast();
    }
  }, [search]);

  const listDayForecast = () => {
    if (loading) {
      return <div>loading..... <FontAwesomeIcon icon={faCloud} color="#1E90FF"></FontAwesomeIcon> </div>; // Display loading indicator
    }
    let dayEvent = "";
    return forecast  ? (
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
    ) : !loading && <div>There is no forecast for the city...   <FontAwesomeIcon icon={faPooStorm}  color="#1E90FF" /></div>;
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
          <button  onClick={() => router.push('/')}>
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
