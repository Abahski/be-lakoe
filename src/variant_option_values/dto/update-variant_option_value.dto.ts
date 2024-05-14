import { PartialType } from '@nestjs/swagger';
import { CreateVariantOptionValueDto } from './create-variant_option_value.dto';

export class UpdateVariantOptionValueDto extends PartialType(CreateVariantOptionValueDto) {}
