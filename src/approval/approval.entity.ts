import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Request } from '../request/request.entity';
import { User } from '../user/user.entity';
import { RequestStatus } from '../request/request.entity';
import { BaseEntity } from '../common/entities/base.entity';

@Entity({
  name: 'approvals',
  synchronize: true,
})
export class Approval extends BaseEntity {
  @OneToOne(() => Request, (request) => request.approvals)
  @JoinColumn()
  request: Request;

  @ManyToOne(() => User)
  approver: User;

  @Column()
  status: string = RequestStatus.PENDING;

  @Column({ nullable: true, type: 'text' })
  comment: string;
}
