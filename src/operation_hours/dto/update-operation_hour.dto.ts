import { PartialType } from '@nestjs/swagger';
import { CreateOperationHourDto } from './create-operation_hour.dto';

export class UpdateOperationHourDto extends PartialType(
  CreateOperationHourDto,
) {}
