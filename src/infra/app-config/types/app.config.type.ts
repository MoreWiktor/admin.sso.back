import { AppEnums } from '@shared/enums';

export type AppConfigType = {
  version: string;
  port: number;
  enviroment: AppEnums.EnviromentEnum;
  baseUrl: string;
  jwtSecret: string;
  cryptoSecret: string;
  name: string;
  bootstrap_emoji: string;
  smtpLogin: string;
  smtpPassword: string;
};
