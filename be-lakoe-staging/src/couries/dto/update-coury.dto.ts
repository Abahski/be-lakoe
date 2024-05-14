import { PartialType } from '@nestjs/swagger';
import { CreateCouryDto } from './create-coury.dto';

export class UpdateCouryDto extends PartialType(CreateCouryDto) {}
