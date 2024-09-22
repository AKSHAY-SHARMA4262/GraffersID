import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyParentRoute, CompanyRoutes } from './company.routes';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create.company.dto';

@Controller({path: CompanyParentRoute})
export class CompanyController {
    constructor(
    private readonly companyService: CompanyService
    ) { }
    
    @Get(CompanyRoutes.get_all_company)
    async getAllCompany() {
        return this.companyService.getAllCompany()
    }

    @Post(CompanyRoutes.add_company)
    async addCompany(@Body() createCompany: CreateCompanyDto) {
        return this.companyService.addCompany(createCompany)
    }

    @Get(CompanyRoutes.get_company_with_review)
    async getCompanyWithReviews(@Param('companyId') companyId: string) {
        return this.companyService.getCompanyWithReviews(companyId)
    }
}
