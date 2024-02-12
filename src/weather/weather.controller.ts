import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeatherCreateDto, WeatherRequestDto } from './dto';
import { WeatherTransformInterceptor } from './interceptors';
import { WeatherService } from './weather.service';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createWeather(@Body() dto: WeatherCreateDto) {
    return await this.weatherService.createWeather(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseInterceptors(WeatherTransformInterceptor)
  async getWeather(@Query() dto: WeatherRequestDto) {
    return await this.weatherService.getWeather(dto);
  }
}
