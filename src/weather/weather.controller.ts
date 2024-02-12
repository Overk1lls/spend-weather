import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WeatherCreateDto } from './dto';
import { WeatherService } from './weather.service';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async createWeather(@Body() dto: WeatherCreateDto) {
    try {
      return await this.weatherService.createWeather(dto);
    } catch (error) {
      throw new InternalServerErrorException({ message: error.message });
    }
  }
}
