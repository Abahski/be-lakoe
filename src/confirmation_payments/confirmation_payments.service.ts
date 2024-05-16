/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Injectable } from '@nestjs/common';
import { CreateConfirmationPaymentDto } from './dto/create-confirmation_payment.dto';
import { UpdateConfirmationPaymentDto } from './dto/update-confirmation_payment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ConfirmationPaymentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    @Body() createConfirmationPaymentDto: CreateConfirmationPaymentDto,
  ) {
    try {
      const { invoice_id } = createConfirmationPaymentDto;
      const invoiceExists = await this.prisma.invoice.findUnique({
        where: {
          id: invoice_id,
        },
      });

      if (!invoiceExists) {
        throw new Error(`Invoice with ID ${invoice_id} not found`);
      }

      return await this.prisma.confirmation_payment.create({
        data: createConfirmationPaymentDto,
      });
    } catch (error) {
      throw new Error(
        `Failed to create confirmation payment: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const confirmation = await this.prisma.confirmation_payment.findMany();

      return {
        message: 'successfully get all confirmation payments',
        data: confirmation,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch confirmation payments: ${error.message}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      const onePayment = await this.prisma.confirmation_payment.findUnique({
        where: { id },
      });

      if (!onePayment) {
        throw new Error(`Confirmation payment with ID ${id} not found`);
      }

      return {
        message: 'Success!!!',
        data: onePayment,
      };
    } catch (error) {}
  }

  async update(
    id: number,
    updateConfirmationPaymentDto: UpdateConfirmationPaymentDto,
  ) {
    try {
      const existingConfirmation =
        await this.prisma.confirmation_payment.findUnique({
          where: {
            id: id,
          },
        });

      if (!existingConfirmation) {
        throw new Error(`Confirmation payment with ID ${id} not found`);
      }

      const updatedConfirmation = await this.prisma.confirmation_payment.update(
        {
          where: { id: id },
          data: updateConfirmationPaymentDto,
        },
      );

      return {
        message: 'Success',
        data: updatedConfirmation,
      };
    } catch (error) {
      throw new Error(
        `Failed to update confirmation payment: ${error.message}`,
      );
    }
  }

  async remove(id: number) {
    try {
      const deletePayment = await this.prisma.confirmation_payment.delete({
        where: { id: id },
      });

      return {
        data: deletePayment,
        message: 'Success!',
      };
    } catch (error) {}
  }
}
