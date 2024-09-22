// src/review/dto/create-review.dto.ts

import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string; 

  @IsNotEmpty()
  @IsMongoId()
  location: string;
    
  @IsNotEmpty()
  @IsString()
  foundedOn: string;
  
  @IsNotEmpty()
  @IsMongoId()
  city: string;
    
   @IsNotEmpty()
  @IsMongoId()
  hi: string;
}
