import { AutoMap } from '@automapper/classes';
import { CompanyEntity } from '@core/company/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique('UQ_97672ac88f789774dd47f7c8be3', ['email', 'company'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @ManyToOne(() => CompanyEntity, (company) => company.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'company_id',
  })
  company: CompanyEntity;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt: Date;
}
