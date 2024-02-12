export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherTemp {
  day: number;
  night: number;
  eve: number;
  morn: number;
  min?: number;
  max?: number;
}

export interface WeatherCurrent {
  dt: number;
  temp: number | WeatherTemp;
  feels_like: number | WeatherTemp;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  visibility?: number;
  sunrise?: number;
  sunset?: number;
  wind_gust?: number;
}

export interface WeatherMinutely {
  dt: number;
  precipitation: number;
}

export interface WeatherHourly extends WeatherCurrent {
  pop: number;
  rain?: {
    [key: string]: number;
  };
  snow?: {
    [key: string]: number;
  };
}

export interface WeatherDaily extends WeatherCurrent {
  summary: string;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: WeatherTemp;
  feels_like: WeatherTemp;
  pop: number;
  uvi: number;
  rain?: number;
  snow?: number;
}

export interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: WeatherCurrent;
  minutely: WeatherMinutely[];
  hourly: WeatherHourly[];
  daily: WeatherDaily[];
}
