import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StylePatternEntity } from './style-pattern.entity';

@Entity('backgrounds')
export class BackgroundEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => StylePatternEntity, (style) => style.id)
  @JoinColumn({ name: 'style_pattern_id' })
  style: StylePatternEntity;
}
