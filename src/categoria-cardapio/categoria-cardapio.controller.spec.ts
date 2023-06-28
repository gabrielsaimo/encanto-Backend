/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaCardapioController } from './categoria-cardapio.controller';

describe('CategoriaCardapioController', () => {
  let controller: CategoriaCardapioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaCardapioController],
    }).compile();

    controller = module.get<CategoriaCardapioController>(
      CategoriaCardapioController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
