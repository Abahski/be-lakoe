import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceHistoriesService } from './invoice_histories.service';

describe('InvoiceHistoriesService', () => {
  let service: InvoiceHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceHistoriesService],
    }).compile();

    service = module.get<InvoiceHistoriesService>(InvoiceHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
