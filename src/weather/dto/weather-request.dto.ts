import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WeatherRequestDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsNotEmpty()
  lon: number;

  @IsString()
  @IsNotEmpty()
  part: string;
}
