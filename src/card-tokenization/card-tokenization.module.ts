import { Module,Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CardTokenizationController } from './card-tokenization.controller';
import { CardTokenizationService } from './card-tokenization.service';
import { CardTokenizationRepository } from './card-tokenization.repository';
import { CardsSchema } from './schemas/card.schema';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cards', schema: CardsSchema }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt_secret'),
        signOptions: {
          expiresIn: configService.get('jwt_expired_time')
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [CardTokenizationController],
  providers: [CardTokenizationRepository, CardTokenizationService, Logger]
})
export class CardTokenizationModule {}
