import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BackgroundEntity } from './background.entity';
import { FormEntity } from './form.entity';
import { CompanyEntity } from '@core/company/entities';
import { Enums } from '@shared/types/page-init-data';
import { ButtonEntity } from './button.entity';
import { FieldEntity } from './field.entity';
import { AutoMap } from '@automapper/classes';

@Entity('pages')
@Unique(['company', 'type'])
export class PageEntity {
  // @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @AutoMap()
  @Column('enum', { enum: Enums.PagesEnum })
  type: Enums.PagesEnum;

  // @AutoMap(() => FormEntity)
  @ManyToOne(() => FormEntity, (form) => form.id)
  @JoinColumn({ name: 'form_id' })
  form: FormEntity;

  // @AutoMap(() => BackgroundEntity)
  @ManyToOne(() => BackgroundEntity, (background) => background.id)
  @JoinColumn({ name: 'background_id' })
  background: BackgroundEntity;

  @AutoMap(() => [ButtonEntity])
  @OneToMany(() => ButtonEntity, (button) => button.page)
  buttons: ButtonEntity[];

  // @AutoMap(() => [FieldEntity])
  @OneToMany(() => FieldEntity, (field) => field.page)
  fields: FieldEntity[];

  // @AutoMap(() => CompanyEntity)
  @ManyToOne(() => CompanyEntity, (company) => company.id)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
