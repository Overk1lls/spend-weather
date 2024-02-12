export enum WeatherExludeEnum {
  CURRENT = 'current',
  MINUTELY = 'minutely',
  HOURLY = 'hourly',
  DAILY = 'daily',
  ALERTS = 'alerts',
}

export const weatherExcludes = Object.values(WeatherExludeEnum);
