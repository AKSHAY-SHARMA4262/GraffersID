import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Review } from './review.entity';
import mongoose, { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create.review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<Review>,
        //  @InjectModel(Company.name) private reviewModel: Model<Company>
    ) { }
    

    async addReview(createReview: CreateReviewDto) {
        try {
    const review = new this.reviewModel({
      ...createReview,
      companyId: new Types.ObjectId(createReview.companyId),
    });

    return await review.save();
  } catch (error) {
   
    if (error instanceof mongoose.Error.ValidationError) {
      throw new BadRequestException('Validation error: ' + error.message);
    }
    if (error instanceof mongoose.Error.CastError) {
      throw new NotFoundException('Invalid company ID: ' + createReview.companyId);
    }

    throw new InternalServerErrorException('An error occurred while creating the review');
  }

    }
}
