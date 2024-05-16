import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post('create')
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    try {
      const invoice = await this.invoicesService.create(createInvoiceDto);
      return {
        data: invoice,
        message: 'Successfully created invoice',
      };
    } catch (error) {
      console.error('Error creating invoice: ', error);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      const invoices = await this.invoicesService.findAll();
      console.log(invoices, 'Invoices fetched');
      return {
        data: invoices,
        message: 'Successfully fetched invoices',
      };
    } catch (error) {
      console.error('Error fetching all invoices: ', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const invoice = await this.invoicesService.findOne(+id);
      return {
        data: invoice,
        message: 'Successfully fetched invoice',
      };
    } catch (error) {
      console.error(`Error fetching invoice with ID ${id}: `, error);
      throw error;
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.invoicesService.remove(+id);
      return {
        message: 'Successfully deleted invoice',
        data: result,
      };
    } catch (error) {
      console.error(`Error removing invoice with ID ${id}: `, error);
      throw error;
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    try {
      const updatedInvoice = await this.invoicesService.update(
        +id,
        updateInvoiceDto,
      );
      return {
        data: updatedInvoice,
        message: 'Successfully updated invoice',
      };
    } catch (error) {
      console.error(`Error updating invoice with ID ${id}: `, error);
      throw error;
    }
  }
}
