import { Body, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      const { invoice_id } = createPaymentDto;
      const invoiceExists = await this.prisma.invoice.findUnique({
        where: {
          id: invoice_id,
        },
      });

      if (!invoiceExists) {
        throw new Error(`Invoice with ID ${invoice_id} not found`);
      }

      return await this.prisma.payment.create({
        data: createPaymentDto,
      });
    } catch (error) {
      throw new Error(`Failed to create payment: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const payment = await this.prisma.payment.findMany();
      return {
        message: 'Successs',
        data: payment,
      };
    } catch (error) {
      throw new Error(`Failed to fetch payment: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: {
          id: id,
        },
      });

      return {
        message: 'Success',
        data: payment,
      };
    } catch (error) {}
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      const payment = await this.prisma.payment.update({
        where: { id: id },
        data: updatePaymentDto,
      });
      return {
        message: 'Successfully updated payment',
        data: payment,
      };
    } catch (error) {
      throw new Error(`Failed to update payment: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const payment = await this.prisma.payment.delete({
        where: {
          id: id,
        },
      });

      return {
        message: 'Success',
        data: payment,
      };
    } catch (error) {
      throw new Error(`Failed to delete payment: ${error.message}`);
    }
  }
}
