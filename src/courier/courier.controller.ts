import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourierService } from './courier.service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Post()
  async create(@Body() createCourierDto: CreateCourierDto) {
    try {
      const courier = await this.courierService.create(createCourierDto);
      return {
        data: courier,
        message: 'Successfully created courier',
      };
    } catch (error) {
      console.error('error create courier : ', error);
    }
  }

  @Get()
  async findAll() {
    try {
      const courier = await this.courierService.findAll();
      return {
        data: courier,
        message: 'Successfully get courier',
      };
    } catch (error) {
      console.error('error get courier : ', error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const invoice = this.courierService.findOne(+id);
      return {
        data: invoice,
        message: 'Successfully fetched courier',
      };
    } catch (error) {
      console.error(`Error fetching courier with ID ${id}: `, error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourierDto: UpdateCourierDto,
  ) {
    try {
      const invoice = await this.courierService.update(+id, updateCourierDto);
      return {
        data: invoice,
        message: 'Successfully updated courier',
      };
    } catch (error) {
      console.error(`Error updating courier with ID ${id}: `, error);
    }
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.courierService.remove(+id);
      return {
        message: 'Successfully deleted courier',
        data: result,
      };
    } catch (error) {
      console.error(`Error removing courier with ID ${id}: `, error);
    }
  }
}
