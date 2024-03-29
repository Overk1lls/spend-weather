import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [CommonModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
