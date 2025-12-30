import { Company } from '../entities/company.entity';
import { CompanyService } from './../services/company.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('/companies')
export class CompanyController {
  constructor(private readonly CompanyService: CompanyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Company[]> {
    return this.CompanyService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.CompanyService.findById(id);
  }

  @Get('/company/:name')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('name') name: string): Promise<Company[]> {
    return this.CompanyService.findAllByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() company: Company): Promise<Company> {
    return this.CompanyService.create(company);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() company: Company): Promise<Company> {
    return this.CompanyService.update(company);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.CompanyService.delete(id);
  }
}
