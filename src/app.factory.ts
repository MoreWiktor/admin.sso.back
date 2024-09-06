import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { HttpAdapterHost } from '@nestjs/core';
import { HttpExceptionFilter } from '@shared/exceptions/filters';
import { ConfigTypes } from '@infra/app-config';
import { AppEnums } from '@shared/enums';
import { useContainer } from 'typeorm';
import { AppModule } from '@infra/IoCC';
import { AppConfigType } from '@infra/app-config/types';

type DocOptionsType = {
  docType: string;
  basicAuthOptions?: basicAuth.BasicAuthMiddlewareOptions;
  swaggerOptions?: SwaggerDocumentOptions;
};

export class AppFactory {
  private readonly configService: ConfigService;
  public static logger = new Logger('App');
  private readonly DEV_DOC_PASS = 'q1w2e3r4';
  private readonly DEV_DOC_USER = 'dev';

  constructor(private readonly _app: INestApplication) {
    this.configService = this._app.get(ConfigService);
    this.app.setGlobalPrefix('api');
  }

  private readonly bootstrapMessage = ({
    port,
    enviroment,
    version,
    name,
    bootstrap_emoji,
  }) => {
    const emojiString = bootstrap_emoji ? bootstrap_emoji + ' ' : '';
    const appNameString = name
      ? name.charAt(0).toUpperCase() + name.slice(1) + ' app'
      : 'App';
    const portString = port ? ` on ${port} port.` : '';
    const versionString = version ? ` Version - ${version}.` : '';
    const enviromentString = enviroment ? ` Environment - ${enviroment}.` : '';
    return (
      emojiString +
      appNameString +
      ' started' +
      portString +
      versionString +
      enviromentString
    );
  };

  get app() {
    return this._app;
  }

  public getConfig<T>(token: AppEnums.ConfigTypeEnum) {
    return this.configService.getOrThrow<T>(token);
  }

  public useGlobalPipes() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    useContainer(this._app.select(AppModule), { fallbackOnErrors: true });
    return this;
  }

  public useGlobalFilters() {
    const httpAdapter = this.app.get(HttpAdapterHost);
    this.app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
    this.app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
    return this;
  }

  public generateOpenApiDoc(options: DocOptionsType[]) {
    const { version, enviroment } =
      this.configService.getOrThrow<ConfigTypes.AppConfigType>(
        AppEnums.ConfigTypeEnum.APP,
      );

    options.forEach((options: DocOptionsType) => {
      options.basicAuthOptions &&
        this.app.use(
          `/api/docs/${options.docType}/*`,
          basicAuth(options.basicAuthOptions),
        );
      SwaggerModule.setup(
        `docs/${options.docType}`,
        this.app,
        SwaggerModule.createDocument(
          this.app,
          new DocumentBuilder()
            .setTitle('Flang Delivery Service')
            .setDescription(
              `Delivery service ${options.docType} document. Enviroment: ${enviroment}`,
            )
            .setVersion(version)
            .build(),
          options.swaggerOptions,
        ),
        {
          useGlobalPrefix: true,
        },
      );
    });

    return this;
  }

  public enableCors(frontUrl?: string) {
    const appConfig = this.configService.getOrThrow<AppConfigType>(
      AppEnums.ConfigTypeEnum.APP,
    );
    this._app.enableCors({
      origin: frontUrl || appConfig.frontUrl,
    });
    return this;
  }

  public async listen() {
    const appConfigs = this.configService.getOrThrow(
      AppEnums.ConfigTypeEnum.APP,
    ) as ConfigTypes.AppConfigType;

    await this._app.listen(appConfigs.port, () =>
      AppFactory.logger.log(this.bootstrapMessage(appConfigs)),
    );
  }
}
