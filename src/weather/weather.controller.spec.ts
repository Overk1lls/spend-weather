import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mockedWeather } from '../../test/__mock__';
import { HttpConfigService, TypeOrmConfigService } from '../common/services';
import { WeatherEntity } from './entities';
import { WeatherData } from './interfaces';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

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
        TypeOrmModule.forFeature([WeatherEntity]),
        HttpModule.registerAsync({
          useClass: HttpConfigService,
        }),
      ],
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    weatherController = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  describe('createWeather()', () => {
    it('should create a new weather', async () => {
      jest
        .spyOn(weatherService, 'createWeather')
        .mockResolvedValueOnce(mockedWeather as WeatherData);

      const result = await weatherController.createWeather({
        lat: 123,
        lon: 123,
      });

      expect(result).toEqual(mockedWeather);
    });
  });

  describe('getWeather()', () => {
    it('should get a new weather', async () => {
      jest
        .spyOn(weatherService, 'getWeather')
        .mockResolvedValueOnce(mockedWeather as WeatherEntity);

      const result = await weatherController.getWeather({
        lat: 123,
        lon: 123,
        part: 'current',
      });

      expect(result).toEqual(mockedWeather);
    });
  });
});
