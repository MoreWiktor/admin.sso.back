import { dynamicImport } from '@shared/utils';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '@core/index';
import { adminModuleFactory } from '@api/admin-panel';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    dynamicImport('adminjs').then(({ AdminJS }) =>
      dynamicImport('@adminjs/nestjs').then(({ AdminModule }) => {
        dynamicImport('@adminjs/typeorm').then(({ Database, Resource }) => {
          AdminJS.registerAdapter({
            Resource,
            Database,
          });
        });

        return AdminModule.createAdminAsync({
          imports: [TypeOrmModule.forFeature(entities)],
          inject: entities.map((entity) => getRepositoryToken(entity)),
          useFactory: adminModuleFactory,
        });
      }),
    ),
  ],
  providers: [],
})
export class AdminPanelModule {}
