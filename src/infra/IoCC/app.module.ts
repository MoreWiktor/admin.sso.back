import { Module } from '@nestjs/common';
import { appModules } from '@infra/IoCC';

@Module({
  imports: appModules,
})
export class AppModule {}
