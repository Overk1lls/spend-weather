import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {
  WeatherExludeEnum,
  weatherExcludes,
} from '../enums/weather-exclude.enum';

export class WeatherCreateDto {
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @IsEnum(WeatherExludeEnum)
  @IsOptional()
  @ApiProperty({ enum: weatherExcludes })
  part?: string;
}
