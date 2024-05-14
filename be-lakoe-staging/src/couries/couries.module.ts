import { Module } from '@nestjs/common';
import { CouriesService } from './couries.service';
import { CouriesController } from './couries.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CouriesController],
  providers: [CouriesService, PrismaService],
})
export class CouriesModule {}
