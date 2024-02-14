import { Test, TestingModule } from '@nestjs/testing';
import { CardapioResolver } from './cardapio.resolver';

describe('CardapioResolver', () => {
  let resolver: CardapioResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardapioResolver],
    }).compile();

    resolver = module.get<CardapioResolver>(CardapioResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
