import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperationHoursService } from './operation_hours.service';
import { CreateOperationHourDto } from './dto/create-operation_hour.dto';
import { UpdateOperationHourDto } from './dto/update-operation_hour.dto';

@Controller('operation-hours')
export class OperationHoursController {
  constructor(private readonly operationHoursService: OperationHoursService) {}

  @Post()
  create(@Body() createOperationHourDto: CreateOperationHourDto) {
    return this.operationHoursService.create(createOperationHourDto);
  }

  @Get()
  findAll() {
    return this.operationHoursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationHoursService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperationHourDto: UpdateOperationHourDto,
  ) {
    return this.operationHoursService.update(+id, updateOperationHourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationHoursService.remove(+id);
  }
}
