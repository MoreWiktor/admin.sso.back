import { CompanyEntity } from '@core/company/entities';
// import { Types } from '@shared/types/page-init';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

enum StylePatternTypeEnum {
  BUTTON = 'button',
  FIELD = 'field',
  FORM = 'form',
  BACKGROUND = 'background',
}

@Entity('style_patterns')
@Unique(['scopeCompany', 'type', 'title'])
export class StylePatternEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('enum', { enum: StylePatternTypeEnum })
  type: StylePatternTypeEnum;

  @Column('jsonb')
  style: object;

  @ManyToOne(() => CompanyEntity, (company) => company.id, { nullable: true })
  @JoinColumn({
    name: 'scope_company_id',
  })
  scopeCompany?: CompanyEntity;
}
