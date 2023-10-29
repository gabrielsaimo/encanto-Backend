import { Test, TestingModule } from '@nestjs/testing';
import { GerenciamentoService } from './gerenciamento.service';

describe('GerenciamentoService', () => {
  let service: GerenciamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GerenciamentoService],
    }).compile();

    service = module.get<GerenciamentoService>(GerenciamentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
