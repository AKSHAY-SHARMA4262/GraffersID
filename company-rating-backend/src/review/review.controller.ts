import { Body, Controller, Post } from '@nestjs/common';
import { ReviewParentRoute, ReviewRoutes } from './review.routes';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create.review.dto';

@Controller({path: ReviewParentRoute})
export class ReviewController {
    constructor(
    private readonly reviewService: ReviewService
    ) { }
    
    @Post(ReviewRoutes.add_review)
    async addReview(@Body() createReview: CreateReviewDto) {
        return this.reviewService.addReview(createReview)
    }
}
