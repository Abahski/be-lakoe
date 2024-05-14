import { Module } from '@nestjs/common';
import { DecorationService } from './decoration.service';
import { DecorationController } from './decoration.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DecorationController],
  providers: [DecorationService, PrismaService],
})
export class DecorationModule {}
