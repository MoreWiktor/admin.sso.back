import { registerAs } from '@nestjs/config';
import { ConfigTypes } from '@infra/app-config';
import { AppEnums } from '@shared/enums';

export const databaseLoader = registerAs(
  AppEnums.ConfigTypeEnum.DATABASE,
  (): ConfigTypes.DatabaseConfigType => ({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  }),
);
