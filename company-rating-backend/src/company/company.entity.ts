import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Company extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  foundedOn: string;

  @Prop({ required: true })
  city: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.virtual('reviews', {
  ref: 'Review',          
  localField: '_id',      
  foreignField: 'companyId', 
});

CompanySchema.set('toJSON', { virtuals: true });
CompanySchema.set('toObject', { virtuals: true });