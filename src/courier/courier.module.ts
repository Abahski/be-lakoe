import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CourierController],
  providers: [CourierService, PrismaService],
})
export class CourierModule {}
