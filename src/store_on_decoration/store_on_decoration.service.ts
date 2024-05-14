/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateStoreOnDecorationDto } from './dto/create-store_on_decoration.dto';
import { UpdateStoreOnDecorationDto } from './dto/update-store_on_decoration.dto';

@Injectable()
export class StoreOnDecorationService {
  create(createStoreOnDecorationDto: CreateStoreOnDecorationDto) {
    return 'This action adds a new storeOnDecoration';
  }

  findAll() {
    return `This action returns all storeOnDecoration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storeOnDecoration`;
  }

  update(id: number, updateStoreOnDecorationDto: UpdateStoreOnDecorationDto) {
    return `This action updates a #${id} storeOnDecoration`;
  }

  remove(id: number) {
    return `This action removes a #${id} storeOnDecoration`;
  }
}
