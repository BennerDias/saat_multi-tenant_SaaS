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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ServicesService } from '../services/service.service';
import { Service } from '../entities/service.entity';
import { CreateServiceDto } from '../dto/service.dto';

@ApiTags('Service')
@UseGuards(JwtAuthGuard)
@Controller('/services')
@ApiBearerAuth()
export class ServiceController {
  constructor(private readonly serviceService: ServicesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Service[]> {
    return this.serviceService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    return this.serviceService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateServiceDto): Promise<Service> {
    return this.serviceService.create(dto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: CreateServiceDto): Promise<Service> {
    return this.serviceService.update(dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.delete(id);
  }
}
