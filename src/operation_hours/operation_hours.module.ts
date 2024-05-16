import { Module } from '@nestjs/common';
import { OperationHoursService } from './operation_hours.service';
import { OperationHoursController } from './operation_hours.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OperationHoursController],
  providers: [OperationHoursService, PrismaService],
})
export class OperationHoursModule {}
