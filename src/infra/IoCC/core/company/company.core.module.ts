import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { companyEntities, companyProviders } from '@core/company';

@Module({
  imports: [TypeOrmModule.forFeature(companyEntities)],
  providers: companyProviders,
})
export class CompanyCoreModule {}
