import { Global, Module } from '@nestjs/common';
import { infraModules, infraProviders, infraExports } from '@infra/IoCC/infra';

@Global()
@Module({
  imports: infraModules,
  providers: infraProviders,
  exports: infraExports,
})
export class InfraModule {}
