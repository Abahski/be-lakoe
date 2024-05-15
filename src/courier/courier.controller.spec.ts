import { Test, TestingModule } from '@nestjs/testing';
import { CourierController } from './courier.controller';
import { CourierService } from './courier.service';

describe('CourierController', () => {
  let controller: CourierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourierController],
      providers: [CourierService],
    }).compile();

    controller = module.get<CourierController>(CourierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
