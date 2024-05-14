/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateConfirmationPaymentDto } from './dto/create-confirmation_payment.dto';
import { UpdateConfirmationPaymentDto } from './dto/update-confirmation_payment.dto';

@Injectable()
export class ConfirmationPaymentsService {
  create(createConfirmationPaymentDto: CreateConfirmationPaymentDto) {
    return 'This action adds a new confirmationPayment';
  }

  findAll() {
    return `This action returns all confirmationPayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} confirmationPayment`;
  }

  update(
    id: number,
    updateConfirmationPaymentDto: UpdateConfirmationPaymentDto,
  ) {
    return `This action updates a #${id} confirmationPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} confirmationPayment`;
  }
}
