import { pageControllers, pageProviders } from '@api/pages';
import { Module } from '@nestjs/common';
import { PageCoreModule } from '../core/page';

@Module({
  controllers: pageControllers,
  providers: pageProviders,
  imports: [PageCoreModule],
})
export class PagesApiModule {}
