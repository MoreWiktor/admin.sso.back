import { registerAs } from '@nestjs/config';
import { ConfigTypes } from '..';
import { AppEnums } from '@shared/enums';

export const rmqLoader = registerAs(
  AppEnums.ConfigTypeEnum.RMQ,
  (): ConfigTypes.RmqConfigType => ({
    notificator: {
      user: process.env.RMQ_USER,
      pass: process.env.RMQ_PASS,
      port: Number(process.env.RMQ_PORT),
      host: process.env.RMQ_HOST,
      protocol: process.env.RMQ_PROTOCOL,
      emailQueue: process.env.NOTIFICATOR_RMQ_EMAIL_QUEUE,
      emailQueueType: process.env.NOTIFICATOR_EMAIL_QUEUE_TYPE,
      emailQueueMessageTtl: Number(
        process.env.NOTIFICATOR_EMAIL_QUEUE_MESSAGE_TTL,
      ),
    },
  }),
);
