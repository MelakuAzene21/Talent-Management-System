import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentsModule } from './talents/talents.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Talent } from './talents/entities/talent.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'talent_management.sqlite',
        entities: [User, Talent],
        synchronize: true, // Set to false in production
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TalentsModule,
    AuthModule,
  ],
})
export class AppModule {}