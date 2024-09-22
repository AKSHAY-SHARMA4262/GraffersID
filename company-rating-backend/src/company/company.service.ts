import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanySchema } from './company.entity';
// import { Review, ReviewSchema } from 'src/review/review.entity';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create.company.dto';
import { Review } from 'src/review/review.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<Company>,
         @InjectModel(Review.name) private reviewModel: Model<Review>
    ) { }
    

    async getAllCompany() {
    try {
      return await this.companyModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving companies: ' + error.message);
    }
  }

  async addCompany(createCompany: CreateCompanyDto) {
    try {
      const data = new this.companyModel(createCompany);
      return await data.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Validation error: ' + error.message);
      }
      throw new InternalServerErrorException('Error adding company: ' + error.message);
    }
  }

  async getCompanyWithReviews(companyId: string) {
    try {
      const company = await this.companyModel
        .findById(companyId)
        .populate('reviews')
        .exec();

      if (!company) {
        throw new NotFoundException('Company not found');
      }

      return company;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new NotFoundException('Invalid company ID: ' + companyId);
      }
      throw new InternalServerErrorException('Error retrieving company with reviews: ' + error.message);
    }
  }
}