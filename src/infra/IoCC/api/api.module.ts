import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { LoggerMiddleware } from '@shared/middlewares';
import { apiModules } from '@infra/IoCC/api';

@Module({
  imports: [
    ...apiModules,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
