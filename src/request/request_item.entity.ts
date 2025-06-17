import { Item } from 'src/item/item.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Request } from './request.entity';
import { BaseEntity } from '../common/entities/base.entity';

@Entity('request_items')
export class RequestItem extends BaseEntity {
  @ManyToOne(() => Request, (request) => request.requestItems)
  request: Request;

  @ManyToOne(() => Item, (item) => item.requestItems)
  item: Item;

  @Column({
    default: 1,
  })
  quantity: number;
}
