import { Entity, Column, OneToMany } from 'typeorm';
import { RequestItem } from '../request/request_item.entity';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('items')
export class Item extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column()
  quantity: number;

  @Column({
    nullable: true,
    length: 50,
  })
  package: string;

  @OneToMany(() => RequestItem, (ri) => ri.item)
  requestItems: RequestItem[];
}
