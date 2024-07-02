import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import {
  notificationProviders,
  notificationExports,
} from '@infra/api/notification';
import { notificationConfig } from '@infra/api/notification/notification.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: notificationConfig,
    }),
  ],
  providers: notificationProviders,
  exports: notificationExports,
})
export class NotificationApiModule {}
