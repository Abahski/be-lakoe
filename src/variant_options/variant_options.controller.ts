import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VariantOptionsService } from './variant_options.service';
import { CreateVariantOptionDto } from './dto/create-variant_option.dto';
import { UpdateVariantOptionDto } from './dto/update-variant_option.dto';

@Controller('variant-options')
export class VariantOptionsController {
  constructor(private readonly variantOptionsService: VariantOptionsService) {}

  @Post('create')
  create(@Body() createVariantOptionDto: CreateVariantOptionDto) {
    return this.variantOptionsService.create(createVariantOptionDto);
  }

  @Get()
  findAll() {
    return this.variantOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantOptionsService.findOne(+id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateVariantOptionDto: UpdateVariantOptionDto,
  ) {
    return this.variantOptionsService.update(+id, updateVariantOptionDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.variantOptionsService.remove(+id);
  }
}
