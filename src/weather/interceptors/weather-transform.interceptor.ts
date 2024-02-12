import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { WeatherEntity } from '../entities';

@Injectable()
export class WeatherTransformInterceptor<WeatherResponseDto>
  implements NestInterceptor<WeatherEntity, WeatherResponseDto>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<WeatherEntity>,
  ): Observable<WeatherResponseDto> {
    return next.handle().pipe(map((w) => this.transfromWeatherData(w)));
  }

  private transfromWeatherData(weather: WeatherEntity): WeatherResponseDto {
    return (weather.current ??
      weather.hourly?.[0] ??
      weather.daily?.[0]) as WeatherResponseDto;
  }
}
