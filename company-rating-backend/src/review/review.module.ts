import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review , ReviewSchema} from './review.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema}])
  ],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
