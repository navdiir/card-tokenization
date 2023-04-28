import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cards, CardsDocument } from './schemas/card.schema';

@Injectable()
export class CardTokenizationRepository {
  constructor(
    @InjectModel(Cards.name) private cardsModel: Model<CardsDocument>
  ) {}

  async saveTokenizedCard(obj:{tokenized_card: string, pk_token: string}) {
    const expiration = Date.now() + 60 * 1000;
    const newTokenizedCard = await this.cardsModel.findOneAndUpdate({ tokenized_card: obj.tokenized_card },{ ...obj, expiration }, { upsert: true, new: true });
    return newTokenizedCard;
  }

  async validateTokenizedCard(obj:{tokenized_card: string, pk_token: string}) {
    const tokenizedCard = await this.cardsModel.findOne({tokenized_card: obj.tokenized_card, pk_token: obj.pk_token});
    if(!tokenizedCard) return undefined;
    return tokenizedCard;
  }
}