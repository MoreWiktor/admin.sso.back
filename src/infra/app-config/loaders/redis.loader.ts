import { registerAs } from '@nestjs/config';
import { ConfigTypes } from '@infra/app-config';
import { AppEnums } from '@shared/enums';

export const redisLoader = registerAs(
  AppEnums.ConfigTypeEnum.REDIS,
  (): ConfigTypes.RedisConfigType => ({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    ttl: Number(process.env.REDIS_TTL),
  }),
);
