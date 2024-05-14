import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.variantsService.createVariant(createVariantDto);
  }

  @Get()
  findAll() {
    return this.variantsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.variantsService.findActive();
  }

  @Get('inactive')
  findInActive() {
    return this.variantsService.findInActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantsService.update(+id, updateVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantsService.remove(+id);
  }
}
