// Enables strict mode for this file. Helps in identifying problematic sections of the code.
"use client";

// Import necessary hooks and components from React and other libraries.
import {  useState } from "react"; // Hooks for managing component state and lifecycle.
import styles from "./page.module.css"; // CSS module for styling components.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation"; // Hook for routing in Next.js applications.
import { getWeatherAttributes } from "./components/weatherCard/weatherCard"; // Function to get weather attributes like icon and color based on weather condition.

// Component for the weather page.
const WeatherPage = () => {
  // State for managing the city input value.
  console.log(process.env.API_KEY);
  const [city, setCity] = useState("");
  // Hook to manage routing.
  const router = useRouter();

  // List of possible weather conditions.
  const conditions = ["Clear", "Rain", "Snow", "Clouds", "Haze", "Mist"];
  // Randomly select a weather condition to simulate different weathers.
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  // Get icon and color based on the randomly selected weather condition.
  const { icon, color } = getWeatherAttributes(randomCondition);

  // Function to handle search operation.
  const handleSearch = () => {
    // Navigate to the forecast page with the city as a query parameter.
    router.push(`/forecast?city=${city}`);
  };

  // Function to clear the input field.
  const clearInput = () => {
    setCity(""); // Reset city state to empty string.
  };

  // Render the component UI.
  return (
    <div className={styles.main}>
      <div>
        {/* Display the weather icon with its corresponding color. */}
        <FontAwesomeIcon icon={icon} color={color} size="2x" />
      </div>
      <h1 className="title">The Weather App</h1> {/* Page title */}

      <div className={styles.searchContainer}>
        {/* Input field for entering city name. */}
        <input
          className={styles.searchInput}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state on change.
          placeholder="Enter city name"
          onKeyDown={(e) => {
            // Trigger search when the Enter key is pressed.
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        {/* Show clear icon when input is not empty and clear input on click. */}
        {city && (
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.clearIcon}
            onClick={clearInput}
          />
        )}
        {/* Static search icon for aesthetics. */}
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.searchIcon}
        />
      </div>

      {/* Search button to trigger search operation. */}
      <button className={styles.button_search} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

// Export the WeatherPage component for use in other parts of the application.
export default WeatherPage;
