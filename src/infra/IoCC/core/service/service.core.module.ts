import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { serviceEntities, serviceProviders } from '@core/service';

@Module({
  imports: [TypeOrmModule.forFeature(serviceEntities)],
  providers: serviceProviders,
})
export class ServiceCoreModule {}
