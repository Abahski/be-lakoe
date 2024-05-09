import { PartialType } from '@nestjs/swagger';
import { CreateVariantOptionDto } from './create-variant_option.dto';

export class UpdateVariantOptionDto extends PartialType(CreateVariantOptionDto) {}
