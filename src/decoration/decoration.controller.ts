import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DecorationService } from './decoration.service';
import { CreateDecorationDto } from './dto/create-decoration.dto';
import { UpdateDecorationDto } from './dto/update-decoration.dto';

@Controller('decoration')
export class DecorationController {
  constructor(private readonly decorationService: DecorationService) {}

  @Post()
  create(@Body() createDecorationDto: CreateDecorationDto) {
    return this.decorationService.create(createDecorationDto);
  }

  @Get()
  findAll() {
    return this.decorationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decorationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDecorationDto: UpdateDecorationDto,
  ) {
    return this.decorationService.update(+id, updateDecorationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decorationService.remove(+id);
  }
}
