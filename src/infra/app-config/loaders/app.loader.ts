import { registerAs } from '@nestjs/config';
import { AppEnums } from '@shared/enums';
import { ConfigTypes } from '..';

export const appLoader = registerAs(
  AppEnums.ConfigTypeEnum.APP,
  (): ConfigTypes.AppConfigType => ({
    version: process.env.npm_package_version,
    name: process.env.npm_package_name,
    bootstrap_emoji: process.env.BOOTSTRAP_EMOJI,
    port: Number(process.env.APP_PORT),
    enviroment: process.env.NODE_ENV as AppEnums.EnviromentEnum,
    baseUrl: process.env.BASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    cryptoSecret: process.env.CRYPTO_SECRET,
    smtpLogin: process.env.SMTP_LOGIN,
    smtpPassword: process.env.SMTP_PASSWORD,
    frontUrl: process.env.FRONT_URL,
  }),
);
