import { WeatherTemp } from '../interfaces';

export class WeatherResponseDto {
  temp: number | WeatherTemp;
  feels_like: number | WeatherTemp;
  pressure: number;
  humidity: number;
  uvi: number;
  wind_speed: number;
  sunrise?: number;
  sunset?: number;
}
