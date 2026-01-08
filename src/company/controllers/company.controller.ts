import { ApiResponse } from '@nestjs/swagger';
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
import { CompanyResponseDto } from '../dto/company-response.dto';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

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
  @ApiResponse({ type: CompanyResponseDto })
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    return this.CompanyService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: CompanyResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompanyDto,
  ): Promise<CompanyResponseDto> {
    return this.CompanyService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.CompanyService.delete(id);
  }
}
