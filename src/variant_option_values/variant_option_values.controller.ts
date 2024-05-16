import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VariantOptionValuesService } from './variant_option_values.service';
import { CreateVariantOptionValueDto } from './dto/create-variant_option_value.dto';
import { UpdateVariantOptionValueDto } from './dto/update-variant_option_value.dto';

@Controller('variant-option-values')
export class VariantOptionValuesController {
  constructor(
    private readonly variantOptionValuesService: VariantOptionValuesService,
  ) {}

  @Post('create')
  create(@Body() createVariantOptionValueDto: CreateVariantOptionValueDto) {
    return this.variantOptionValuesService.create(createVariantOptionValueDto);
  }

  @Get()
  findAll() {
    return this.variantOptionValuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantOptionValuesService.findOne(+id);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateVariantOptionValueDto: UpdateVariantOptionValueDto,
  ) {
    return this.variantOptionValuesService.update(
      +id,
      updateVariantOptionValueDto,
    );
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.variantOptionValuesService.remove(+id);
  }
}
