// src/review/dto/create-review.dto.ts

import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class GetCompanyDto {
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
}
