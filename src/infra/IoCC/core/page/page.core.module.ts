import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pageEntities, pageProviders, pageExports } from '@core/page';

@Module({
  imports: [TypeOrmModule.forFeature(pageEntities)],
  providers: pageProviders,
  exports: pageExports,
})
export class PageCoreModule {}
