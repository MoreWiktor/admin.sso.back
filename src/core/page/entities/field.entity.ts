import { Enums } from '@shared/types/page-init-data';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { StylePatternEntity } from './style-pattern.entity';
import { PageEntity } from './page.entity';

@Entity('fields')
@Unique(['page', 'position'])
export class FieldEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15 })
  title: string;

  @Column()
  position: number;

  @Column('enum', { enum: Enums.InputTypeEnum })
  type: Enums.InputTypeEnum;

  @Column('boolean', {
    default: true,
  })
  required: boolean;

  @ManyToOne(() => PageEntity, (page) => page.id)
  @JoinColumn({ name: 'page_id' })
  page: PageEntity;

  @ManyToOne(() => StylePatternEntity, (style) => style.id)
  @JoinColumn({ name: 'style_pattern_id' })
  style: StylePatternEntity;
}
