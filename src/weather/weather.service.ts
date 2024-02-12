import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherCreateDto } from './dto';
import { WeatherEntity } from './entities';
import { WeatherData } from './interfaces';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {}

  async createWeather(dto: WeatherCreateDto) {
    const result = await this.httpService.axiosRef.get<WeatherData>('', {
      params: {
        ...dto,
        exclude: dto.part,
      },
    });

    const { data } = result;

    await this.weatherRepository.upsert(data, {
      conflictPaths: ['lat', 'lon'],
      skipUpdateIfNoValuesChanged: true,
    });

    return data;
  }
}
