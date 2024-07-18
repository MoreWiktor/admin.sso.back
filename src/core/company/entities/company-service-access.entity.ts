import { CompanyEntity } from '@core/company/entities';
import { ServiceEntity } from '@core/service/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'companies_services_access' })
export class CompanyServiceAccessEntity {
  @PrimaryColumn({
    name: 'company_id',
    type: 'uuid',
  })
  @ManyToOne(() => CompanyEntity, (company) => company.id)
  @JoinColumn({
    name: 'company_id',
  })
  company: CompanyEntity;

  @PrimaryColumn({
    name: 'service_id',
    type: 'uuid',
  })
  @ManyToOne(() => ServiceEntity, (service) => service.id)
  @JoinColumn({
    name: 'service_id',
  })
  service: ServiceEntity;

  @Column({
    default: false,
  })
  access: boolean;

  @Column({
    name: 'expired_at',
    type: 'timestamptz',
  })
  expiredAt: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
