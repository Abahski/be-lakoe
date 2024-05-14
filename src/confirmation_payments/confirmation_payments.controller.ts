import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfirmationPaymentsService } from './confirmation_payments.service';
import { CreateConfirmationPaymentDto } from './dto/create-confirmation_payment.dto';
import { UpdateConfirmationPaymentDto } from './dto/update-confirmation_payment.dto';

@Controller('confirmation-payments')
export class ConfirmationPaymentsController {
  constructor(
    private readonly confirmationPaymentsService: ConfirmationPaymentsService,
  ) {}

  @Post()
  create(@Body() createConfirmationPaymentDto: CreateConfirmationPaymentDto) {
    return this.confirmationPaymentsService.create(
      createConfirmationPaymentDto,
    );
  }

  @Get()
  findAll() {
    return this.confirmationPaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.confirmationPaymentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfirmationPaymentDto: UpdateConfirmationPaymentDto,
  ) {
    return this.confirmationPaymentsService.update(
      +id,
      updateConfirmationPaymentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.confirmationPaymentsService.remove(+id);
  }
}
