import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  @Post('send')
  sendNotification(@Body() body: any) {
    const notification = body;
    this.notificationsGateway.handleNotification(notification);
    return { message: 'Notificação enviada com sucesso' };
  }
}
