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

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
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

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
