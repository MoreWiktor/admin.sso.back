import { Module } from '@nestjs/common';
import { coreModules } from './index';

@Module({
  imports: coreModules,
})
export class CoreModule {}
