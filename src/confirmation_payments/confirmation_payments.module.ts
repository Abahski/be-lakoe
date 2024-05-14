import { Module } from '@nestjs/common';
import { ConfirmationPaymentsService } from './confirmation_payments.service';
import { ConfirmationPaymentsController } from './confirmation_payments.controller';

@Module({
  controllers: [ConfirmationPaymentsController],
  providers: [ConfirmationPaymentsService],
})
export class ConfirmationPaymentsModule {}
