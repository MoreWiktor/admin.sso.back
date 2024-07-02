import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from '@infra/IoCC';
import { ConfigTypeEnum } from '@shared/enums/app';
import { DocsConfigType } from '@infra/app-config/types';
import { AppFactory } from './app.factory';
// import { Logger } from 'nestjs-pino';

async function bootstrap() {
  // const logger = AppFactory.logger;
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // app.useLogger(app.get(Logger));
  const appFactory = new AppFactory(app);
  const { user, pass } = appFactory.getConfig<DocsConfigType>(
    ConfigTypeEnum.DOCS,
  );
  appFactory
    .useGlobalPipes()
    .useGlobalFilters()
    .generateOpenApiDoc([
      {
        docType: 'development',
        swaggerOptions: {
          operationIdFactory: (_, methodKey: string) => methodKey,
          deepScanRoutes: true,
        },
        basicAuthOptions: {
          challenge: true,
          users: {
            [user]: pass,
          },
        },
      },
    ])
    .listen();
}
bootstrap();
