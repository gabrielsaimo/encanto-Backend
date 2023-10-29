import { Test, TestingModule } from '@nestjs/testing';
import { GerenciamentoController } from './gerenciamento.controller';

describe('GerenciamentoController', () => {
  let controller: GerenciamentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GerenciamentoController],
    }).compile();

    controller = module.get<GerenciamentoController>(GerenciamentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
