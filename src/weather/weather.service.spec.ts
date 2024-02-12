import { HttpModule, HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mockedWeather } from '../../test/__mock__';
import { HttpConfigService, TypeOrmConfigService } from '../common/services';
import { WeatherCreateDto, WeatherRequestDto } from './dto';
import { WeatherEntity } from './entities';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let weatherRepository: Repository<WeatherEntity>;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
        }),
        HttpModule.registerAsync({
          useClass: HttpConfigService,
        }),
      ],
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(WeatherEntity),
          useValue: {
            upsert: () => Promise.resolve(true),
            findOne: () => Promise.resolve(mockedWeather),
          },
        },
      ],
    }).compile();

    weatherService = module.get<WeatherService>(WeatherService);
    httpService = module.get<HttpService>(HttpService);
    weatherRepository = module.get<Repository<WeatherEntity>>(
      getRepositoryToken(WeatherEntity),
    );
  });

  describe('createWeather()', () => {
    it('should create a weather', async () => {
      jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce({
        data: mockedWeather,
      });

      const createWeatherDto: WeatherCreateDto = {
        lat: 38.8951,
        lon: -77.0364,
      };

      const result = await weatherService.createWeather(createWeatherDto);

      expect(result).toEqual(mockedWeather);
    });
  });

  describe('getWeather()', () => {
    it('should get a weather', async () => {
      const requestWeatherDto: WeatherRequestDto = {
        lat: 38.8951,
        lon: -77.0364,
        part: 'current,minutely,hourly,daily',
      };

      const result = await weatherService.getWeather(requestWeatherDto);

      expect(result).toEqual(mockedWeather);
    });

    it('should throw 404', async () => {
      jest.spyOn(weatherRepository, 'findOne').mockResolvedValueOnce(undefined);

      const requestWeatherDto: WeatherRequestDto = {
        lat: 38.8951,
        lon: -77.0364,
        part: 'current,minutely,hourly,daily',
      };

      expect(() =>
        weatherService.getWeather(requestWeatherDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
