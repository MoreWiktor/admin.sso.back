import { Module } from '@nestjs/common';
import { userEntities, userProviders } from '@core/user';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature(userEntities)],
  providers: userProviders,
})
export class UserCoreModule {}
