import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardsDocument = Cards & Document;

@Schema({  collection: 'cards' })
export class Cards {
  @Prop()
  tokenized_card: string;

  @Prop()
  pk_token: string;

  @Prop()
  expiration: number
}

export const CardsSchema = SchemaFactory.createForClass(Cards);