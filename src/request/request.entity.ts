import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Approval } from '../approval/approval.entity';
import { RequestItem } from './request_item.entity';
import { BaseEntity } from '../common/entities/base.entity';

export enum RequestStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

@Entity('requests')
export class Request extends BaseEntity {
  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @Column()
  quantity: number;

  @Column()
  status: string = RequestStatus.PENDING;

  @OneToMany(() => Approval, (approval) => approval.request)
  approvals: Approval;

  @OneToMany(() => RequestItem, (requestItem) => requestItem.request, {
    cascade: true,
  })
  requestItems: RequestItem[];
}
