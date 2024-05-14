import { PartialType } from '@nestjs/swagger';
import { CreateStoreOnDecorationDto } from './create-store_on_decoration.dto';

export class UpdateStoreOnDecorationDto extends PartialType(
  CreateStoreOnDecorationDto,
) {}
