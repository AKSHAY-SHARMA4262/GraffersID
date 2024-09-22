import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './company.entity';
import { Review, ReviewSchema } from 'src/review/review.entity';
import { ReviewModule } from 'src/review/review.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    ReviewModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
