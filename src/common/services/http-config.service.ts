import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createHttpOptions(): HttpModuleOptions | Promise<HttpModuleOptions> {
    return {
      baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
      timeout: 5000,
      params: {
        appid: this.configService.getOrThrow<string>('OPEN_WEATHER_API_KEY'),
      },
    };
  }
}
