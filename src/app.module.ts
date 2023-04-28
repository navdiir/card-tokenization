import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CardTokenizationModule } from './card-tokenization/card-tokenization.module';
import configuration from './config/app';
import { routes } from './routes'; 

const env = process.env.NODE_ENV || 'dev';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ConfigModule.forRoot({
      envFilePath: ['.env', `environments/${env}.env`],
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('databaseuri'),
      }),
      inject: [ConfigService]
    }),
    CardTokenizationModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
