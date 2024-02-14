import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { CardapioService } from 'src/services/Cardapio/Cardapio.service';
import { Cardapio } from 'src/services/Cardapio/cardapio.entity';

@Resolver(() => Cardapio)
export class CardapioResolver {
  constructor(private cardapioService: CardapioService) {}

  @Query(() => [Cardapio])
  async cardapios(): Promise<any> {
    const cardapio = await this.cardapioService.findAll();
    return cardapio;
  }

  @Mutation(() => Cardapio)
  async updateCardapio(cardapio: any): Promise<any> {
    return await this.cardapioService.update(cardapio);
  }
}
