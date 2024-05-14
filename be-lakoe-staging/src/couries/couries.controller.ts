import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CouriesService } from './couries.service';
import { CreateCouryDto } from './dto/create-coury.dto';
// import { UpdateCouryDto } from './dto/update-coury.dto';

@Controller('couries')
export class CouriesController {
  constructor(private readonly couriesService: CouriesService) {}

  @Post()
  create(@Body() createCouryDto: CreateCouryDto) {
    return this.couriesService.create(createCouryDto);
  }

  @Get()
  findAll() {
    return this.couriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCouryDto: UpdateCouryDto) {
  //   return this.couriesService.update(+id, updateCouryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couriesService.remove(+id);
  }
}
