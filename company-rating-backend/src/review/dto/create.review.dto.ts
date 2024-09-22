// src/review/dto/create-review.dto.ts

import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  companyId: string

  @IsNotEmpty()
  @IsMongoId()
  fullName: string;
    
  @IsNotEmpty()
  @IsString()
  subject: string; 

  @IsNotEmpty()
  @IsMongoId()
  reviewText: string;
    
  @IsNotEmpty()
  @IsMongoId()
  rating: number;
}
