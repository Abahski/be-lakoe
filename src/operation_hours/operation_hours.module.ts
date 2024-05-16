import { Module } from '@nestjs/common';
import { OperationHoursService } from './operation_hours.service';
import { OperationHoursController } from './operation_hours.controller';

@Module({
  controllers: [OperationHoursController],
  providers: [OperationHoursService],
})
export class OperationHoursModule {}
