import { Module } from '@nestjs/common';
import { ConfirmationPaymentsService } from './confirmation_payments.service';
import { ConfirmationPaymentsController } from './confirmation_payments.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ConfirmationPaymentsController],
  providers: [ConfirmationPaymentsService, PrismaService],
})
export class ConfirmationPaymentsModule {}
