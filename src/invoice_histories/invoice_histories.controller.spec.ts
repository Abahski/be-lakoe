import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceHistoriesController } from './invoice_histories.controller';
import { InvoiceHistoriesService } from './invoice_histories.service';

describe('InvoiceHistoriesController', () => {
  let controller: InvoiceHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceHistoriesController],
      providers: [InvoiceHistoriesService],
    }).compile();

    controller = module.get<InvoiceHistoriesController>(
      InvoiceHistoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
