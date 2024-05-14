import { PartialType } from '@nestjs/swagger';
import { CreateConfirmationPaymentDto } from './create-confirmation_payment.dto';

export class UpdateConfirmationPaymentDto extends PartialType(
  CreateConfirmationPaymentDto,
) {}
