import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import {
  WeatherCurrent,
  WeatherDaily,
  WeatherHourly,
  WeatherMinutely,
} from '../interfaces';

@Entity({ name: 'weather' })
@Unique(['lat', 'lon'])
export class WeatherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'real' })
  lat: number;

  @Column({ type: 'real' })
  lon: number;

  @Column()
  @Check('NOW() AT TIME ZONE timezone IS NOT NULL')
  timezone: string;

  @Column()
  timezone_offset: number;

  @Column({ type: 'jsonb', nullable: true })
  current: WeatherCurrent;

  @Column({ type: 'jsonb', array: false, nullable: true })
  minutely: WeatherMinutely[];

  @Column({ type: 'jsonb', array: false, nullable: true })
  hourly: WeatherHourly[];

  @Column({ type: 'jsonb', array: false, nullable: true })
  daily: WeatherDaily[];

  @CreateDateColumn({ default: () => 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'NOW()' })
  updatedAt: Date;
}
