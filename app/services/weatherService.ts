const API_BASE_URL = "https://api.openweathermap.org";
const API_KEY = "b44ba68305706ff5e481f32b5465ba4a";

// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// Define interfaces for the API responses
export interface GeoLocationResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherForecast {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      // Add other relevant fields as needed
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    // Include other properties as needed, e.g., wind, clouds, etc.
  }>;
  city: {
    name: string;
    country: string;
    // Other city-related information can be included here
  };
}

export const fetchWeather = async (
  city: string | string[]
): Promise<WeatherForecast> => {
  // Convert city name to lat/lon
  const geoUrl = `${API_BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  const geoRes = await fetch(geoUrl);
  const geoData: GeoLocationResponse[] = await geoRes.json();
  const { lat, lon } = geoData[0];

  if (!geoRes.ok) {
    console.log("'Failed to fetch geo location data'");
  }

  const weatherUrl = `${API_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const weatherRes = await fetch(weatherUrl);
  const weatherData: WeatherForecast = await weatherRes.json();

  if (!weatherRes.ok) {
    console.log("'Failed to fetch wether data'");
  }

  return weatherData;
};
