// Enables strict mode for this file, enhancing error detection and performance.
"use client";

// Import necessary hooks from React, including useEffect for side effects, useState for state management,
// and Suspense for lazy loading components.
import { useEffect, useState, Suspense } from "react";
// Import utility functions and types from the weather service.
import { fetchWeather, WeatherForecast } from "../services/weatherService";
// Hook to access search parameters from the URL.
import { useSearchParams } from "next/navigation";
// Import the WeatherCard component for displaying individual weather forecasts.
import WeatherCard from "@/app/components/weatherCard/weatherCard";
// CSS module for styling.
import styles from "./page.module.css";
// Component to use FontAwesome icons for visual embellishments.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Icons used in the UI for visual cues and navigation.
import { faArrowLeft, faPooStorm, faCloud } from "@fortawesome/free-solid-svg-icons";
// Hook for programmatic navigation within the application.
import { useRouter } from "next/navigation";

// Component to display weather forecast for a specific city.
const Forecast = () => {
  // State to hold the weather forecast data.
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get("city");

  // Effect hook to fetch weather data based on the search parameter.
  useEffect(() => {
    if (search) {
      setLoading(true); // Indicate loading state.
      const loadForecast = async () => {
        try {
          // Attempt to fetch weather data.
          const data = await fetchWeather(search);
          if (data) {
            setForecast(data); 
          }
        } catch (error) {
          console.error("Failed to fetch weather data:", error); // Log any errors.
        } finally {
          setLoading(false); // Reset loading state.
        }
      };
      loadForecast(); // Invoke the async function to load forecast data.
    }
  }, [search]); // Effect dependency array includes 'search' to trigger effect on change.

  // Function to render the forecast or loading/empty states.
  const listDayForecast = () => {
    if (loading) {
      // Display a loading indicator.
      return <div>loading..... <FontAwesomeIcon icon={faCloud} color="#1E90FF"></FontAwesomeIcon> </div>;
    }
    let dayEvent = "";
    return forecast ? (
      <>
        <h1 className="title" style={{ width: "100%" }}>{search?.toUpperCase()}</h1>
        {/* Map over forecast data to render WeatherCard components for each day. */}
        {forecast.list.map((day, index) => {
          const dateString = new Date(day.dt * 1000).toDateString();
          if (dateString !== dayEvent) {
            dayEvent = dateString;
            return <WeatherCard key={index} data={day} />;
          }
          return null; // Skip rendering if the date is the same as the previous entry.
        })}
      </>
    ) : (
      !loading && (
        // Display a message when no forecast data is available.
        <div>There is no forecast for the city... <FontAwesomeIcon icon={faPooStorm} color="#1E90FF" /></div>
      )
    );
  };

  // Render the list of day forecasts.
  return <>{listDayForecast()}</>;
};

// Component for the forecast page layout.
const ForecastPage = () => {
  // useRouter hook for navigation.
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.backButton}>
          {/* Button to navigate back to the home page. */}
          <button onClick={() => router.push("/")}>
            <FontAwesomeIcon icon={faArrowLeft} fontSize="2rem" />
          </button>
        </div>

        <h1 className="title">Weather Forecast:</h1>

        <div className={styles.cardListContainer}>
          {/* Suspense component wraps Forecast to handle async loading state. this is something new in next js and also is something new i learned */}
          <Suspense fallback={<div>Loading...</div>}>
            <Forecast></Forecast>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

// Export ForecastPage component for use in the application.
export default ForecastPage;
