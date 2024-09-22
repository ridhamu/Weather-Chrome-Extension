const OPEN_WEATHER_API_KEY: string = '2f14b7611a263460947f8455c6d602f9';

export interface OpenWeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

export async function fetchOpenWeatherData(city: string): Promise<OpenWeatherData> {
  const response = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!(await response).ok) {
    throw new Error('city not found!!');
  }

  const data = (await response).json();
  return data;
}
