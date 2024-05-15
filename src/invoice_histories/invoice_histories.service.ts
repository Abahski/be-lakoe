/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Injectable } from '@nestjs/common';
import { CreateInvoiceHistoryDto } from './dto/create-invoice_history.dto';
import { UpdateInvoiceHistoryDto } from './dto/update-invoice_history.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoiceHistoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createInvoiceHistoryDto: CreateInvoiceHistoryDto) {
    try {
      const { invoice_id } = createInvoiceHistoryDto;
      const invoiceId = await this.prisma.invoice.findUnique({
        where: { id: invoice_id },
      });

      if (!invoiceId) {
        return {
          message: 'Invoice not found',
        };
      }

      const history = await this.prisma.invoice_history.create({
        data: createInvoiceHistoryDto,
      });

      return {
        message: 'Successfully created invoice history',
        data: history,
      };
    } catch (error) {
      throw new Error(`Failed to create invoice history: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const histories = await this.prisma.invoice_history.findMany({
        select: {
          id: true,
          status: true,
          invoice_id: true,
          created_at: true,
        },
      });
      return {
        message: 'Successfully fetched all invoice histories',
        data: histories,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch all invoice histories: ${error.message}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      const history = await this.prisma.invoice_history.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          status: true,
          invoice_id: true,
          created_at: true,
        },
      });

      return {
        message: `Successfully fetched invoice history with id ${id}`,
        data: history,
      };
    } catch (error) {
      throw new Error(
        `Failed to fetch invoice history with id ${id}: ${error.message}`,
      );
    }
  }

  async update(id: number, updateInvoiceHistoryDto: UpdateInvoiceHistoryDto) {
    try {
      const history = await this.prisma.invoice_history.update({
        where: { id: id },
        data: updateInvoiceHistoryDto,
      });

      return {
        data: history,
        message: 'Successfully updated invoice history',
      };
    } catch (error) {
      throw new Error('Failed to update invoice history: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      const findHistory = await this.prisma.invoice_history.findUnique({
        where: { id: id },
      });

      if (!findHistory) {
        return {
          message: `Failed to delete invoice history with id ${id}`,
        };
      }

      const history = await this.prisma.invoice_history.delete({
        where: { id: id },
      });

      return {
        data: history,
        message: 'Successfully deleted invoice history',
      };
    } catch (error) {
      throw new Error('Failed to delete invoice history: ' + error.message);
    }
  }
}
