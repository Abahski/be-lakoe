import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreOnDecorationService } from './store_on_decoration.service';
import { CreateStoreOnDecorationDto } from './dto/create-store_on_decoration.dto';
import { UpdateStoreOnDecorationDto } from './dto/update-store_on_decoration.dto';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoreOnDecorationDto: UpdateStoreOnDecorationDto,
  ) {
    return this.storeOnDecorationService.update(
      +id,
      updateStoreOnDecorationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeOnDecorationService.remove(+id);
  }
}
