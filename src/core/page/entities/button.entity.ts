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

@Entity('buttons')
@Unique(['page', 'position'])
export class ButtonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15 })
  title: string;

  @Column()
  position: number;

  @Column('enum', { enum: Enums.ButtonTypeEnum })
  type: Enums.ButtonTypeEnum;

  @ManyToOne(() => StylePatternEntity, (style) => style.id)
  @JoinColumn({ name: 'style_pattern_id' })
  style: StylePatternEntity;

  @ManyToOne(() => PageEntity, (page) => page.id)
  @JoinColumn({ name: 'page_id' })
  page: PageEntity;
}
