import { WeatherEntity } from '../src/weather/entities';

export const mockedWeather: Partial<WeatherEntity> = {
  lat: 38.8951,
  lon: -77.0364,
  timezone: 'America/New_York',
  timezone_offset: -14400,
  current: {
    dt: 1707757200,
    uvi: 1.16,
    temp: {
      day: 282.39,
      eve: 281.41,
      max: 282.86,
      min: 280.97,
      morn: 282.04,
      night: 280.97,
    },
    clouds: 100,
    sunset: 1707777672,
    sunrise: 1707739424,
    weather: [
      {
        id: 501,
        icon: '10d',
        main: 'Rain',
        description: 'moderate rain',
      },
    ],
    humidity: 88,
    pressure: 1010,
    wind_deg: 93,
    dew_point: 280.51,
    wind_gust: 7.83,
    feels_like: {
      day: 281.86,
      eve: 279.91,
      morn: 282.04,
      night: 279.16,
    },
    wind_speed: 3.01,
  },
  minutely: [],
  hourly: [],
  daily: [],
};
