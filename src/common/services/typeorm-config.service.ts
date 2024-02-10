import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: ['warn', 'error'],
      entities: ['dist/**/*.entity.{ts,js}'],
    };
  }
}