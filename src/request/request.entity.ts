import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Approval } from '../approval/approval.entity';
import { Item } from '../items/item.entity';

export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @ManyToOne(() => Item, (item) => item.requests)
  item: Item;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;

  @OneToOne(() => Approval, (approval) => approval.request)
  approval: Approval;

  @CreateDateColumn()
  createdAt: Date;
}
