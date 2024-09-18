import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StylePatternEntity } from './style-pattern.entity';

@Entity('forms')
export class FormEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15 })
  title: string;

  @ManyToOne(() => StylePatternEntity, (style) => style.id)
  @JoinColumn({ name: 'style_pattern_id' })
  style: StylePatternEntity;
}
