import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { WeatherCreateDto, WeatherRequestDto } from './dto';
import { WeatherEntity } from './entities';
import { WeatherData } from './interfaces';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(WeatherEntity)
    private readonly weatherRepository: Repository<WeatherEntity>,
  ) {}

  async createWeather(dto: WeatherCreateDto): Promise<WeatherData> {
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

  async getWeather(dto: WeatherRequestDto) {
    const { part, lat, lon } = dto;
    const exludes = part.split(',');
    const selectList = Object.keys(WeatherEntity).filter(
      (key) => !exludes.includes(key),
    ) as FindOptionsSelect<WeatherEntity>;

    const weather = await this.weatherRepository.findOne({
      where: {
        lat,
        lon,
      },
      select: selectList,
    });
    if (!weather) {
      throw new NotFoundException('No weather data by such coordinates');
    }

    return weather;
  }
}
