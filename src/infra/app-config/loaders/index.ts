import { appLoader } from './app.loader';
import { databaseLoader } from './database.loader';
import { rmqLoader } from './rmq.loader';
import { redisLoader } from './redis.loader';
import { docsLoader } from './docs.loader';

export * from './app.loader';
export * from './database.loader';

export const loaders = [
  appLoader,
  databaseLoader,
  rmqLoader,
  redisLoader,
  docsLoader,
];
