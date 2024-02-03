/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import qrcode from 'qrcode-terminal';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';

@Injectable()
export class WhatsappService {
  public QRCode: any;
  private client: Client;
  menuLink = 'https://encanto-amapaense.vercel.app/Cardapio';
  DeliveryLink = 'https://encanto-amapaense.vercel.app/Delivery';

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
    });

    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
      this.QRCode = qr;
    });

    this.client.on('ready', () => {
      console.log('Client is ready!');
    });

    this.client.on('message_create', async (message) => {
      console.log('message:', message.body);
      if (
        message.body.toLowerCase() === 'oi' ||
        message.body.toLowerCase() === 'olá' ||
        message.body.toLowerCase() === 'ola' ||
        message.body.toLowerCase() === 'Bom Dia' ||
        message.body.toLowerCase() === 'Boa Tarde' ||
        message.body.toLowerCase() === 'Boa Noite'
      ) {
        this.sendInitialOptions(message);
      } else if (message.body.trim() === '1') {
        const chat = await message.getChat();
        chat.sendMessage(`Aqui está o nosso cardápio:
${this.menuLink}`);
      } else if (message.body.trim() === '2') {
        const chat = await message.getChat();
        chat.sendMessage(
          `Aqui está o link para o nosso delivery:
${this.DeliveryLink}`
        );
      } else if (message.body.trim() === '3') {
        const chat = await message.getChat();
        chat.sendMessage(
          `mande o número do pedido que deseja cancelar, por favor.`
        );
      }
    });

    this.client.initialize();
  }

  getClient(): Client {
    return this.client;
  }

  getQR(): any {
    return this.QRCode;
  }

  private async sendInitialOptions(message: Message) {
    try {
      const chat = await message.getChat();
      chat.sendMessage(`Olá! Bem-vindo ao Encanto Amapaense. Como posso te ajudar hoje?

  1. Cardápio
  2. Delivery
  3. Cancelar pedido

Por favor, responda com o número da opção que você gostaria de escolher.
      `);
    } catch (error) {
      console.error('Error sending initial options:', error);
    }
  }
}
