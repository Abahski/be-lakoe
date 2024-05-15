import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourierService } from './courier.service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Post()
  create(@Body() createCourierDto: CreateCourierDto) {
    return this.courierService.create(createCourierDto);
  }

  @Get()
  findAll() {
    return this.courierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourierDto: UpdateCourierDto) {
    return this.courierService.update(+id, updateCourierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courierService.remove(+id);
  }
}
