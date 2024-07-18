import { AutoMap } from '@automapper/classes';
import { PermissionEntity, RoleEntity } from '@core/service/entities';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'roles_permissions' })
export class RolePermissionEntity {
  @PrimaryColumn({
    name: 'role_id',
    type: 'uuid',
  })
  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @PrimaryColumn({
    name: 'permission_id',
    type: 'uuid',
  })
  @ManyToOne(() => PermissionEntity, (permission) => permission.id)
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;

  @AutoMap()
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
