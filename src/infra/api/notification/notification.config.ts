import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConfigService } from '@nestjs/config';
import { ConfigTypes } from '@infra/app-config';
import { AppEnums } from '@shared/enums';
import { join } from 'path';
import { MailerOptions } from '@nestjs-modules/mailer';

export const notificationConfig = async (
  configService: ConfigService,
): Promise<MailerOptions> => {
  const { smtpLogin, smtpPassword } =
    configService.getOrThrow<ConfigTypes.AppConfigType>(
      AppEnums.ConfigTypeEnum.APP,
    );

  return {
    transport: `smtps://${smtpLogin}:${smtpPassword}@smtp.yandex.ru`,
    defaults: {
      from: `"No Reply" <${smtpLogin}>`,
    },
    template: {
      dir: join(__dirname, '..', 'notification', 'templates'),
      adapter: new EjsAdapter(),
      options: {
        strict: true,
      },
    },
  };
};
