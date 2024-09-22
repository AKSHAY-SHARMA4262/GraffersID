import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Company' })
  companyId: Types.ObjectId;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  reviewText: string;

  @Prop({ required: true })
  rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);