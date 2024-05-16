import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StoreOnDecorationService } from './store_on_decoration.service';
import { CreateStoreOnDecorationDto } from './dto/create-store_on_decoration.dto';

@Controller('store-on-decoration')
export class StoreOnDecorationController {
  constructor(
    private readonly storeOnDecorationService: StoreOnDecorationService,
  ) {}

  @Post()
  create(@Body() createStoreOnDecorationDto: CreateStoreOnDecorationDto) {
    return this.storeOnDecorationService.create(createStoreOnDecorationDto);
  }

  @Get()
  findAll() {
    return this.storeOnDecorationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeOnDecorationService.findOne(+id);
  }
}
