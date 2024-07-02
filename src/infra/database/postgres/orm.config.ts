import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { ConfigTypes, ConfigLoaders } from '@infra/app-config';
import { entities } from '@core/index';

export const ormConfig = (
  dbConfig: ConfigTypes.DatabaseConfigType | object,
): TypeOrmModuleOptions => {
  const migrationsDir = join(__dirname, 'migrations', '**/*.js');
  return {
    ...dbConfig,
    type: 'postgres',
    synchronize: false,
    migrations: [migrationsDir],
    entities: entities,
    autoLoadEntities: true,
    migrationsRun: true,
    logging: true,
  };
};

config();

export default new DataSource(
  ormConfig(ConfigLoaders.databaseLoader()) as DataSourceOptions,
);
