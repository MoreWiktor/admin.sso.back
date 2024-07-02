import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      renameContext: 'App',
    }),
  ],
})
export class LoggerInfraModule {}
