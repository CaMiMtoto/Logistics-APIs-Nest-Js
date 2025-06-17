import { Entity, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Request } from '../request/request.entity';
import { BaseEntity } from '../common/entities/base.entity';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  STAFF = 'Staff',
  APPROVER = 'Approver',
  ADMIN = 'Admin',
}

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STAFF })
  role: UserRole;

  @OneToMany(() => Request, (request) => request.user)
  requests: Request[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
