import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { FuelProduct } from './fuel-product.entity';
import { FuelSaleTransaction } from './fuel-sale-transaction.entity';

@Entity('fuel_nozzles')
@Unique(['pump_code', 'nozzle_code'])
export class FuelNozzle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pump_code: string;

  @Column()
  nozzle_code: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @ManyToOne(() => FuelProduct, (product) => product.nozzles, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'product_id' })
  product: FuelProduct;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => FuelSaleTransaction, (transaction) => transaction.nozzle)
  transactions: FuelSaleTransaction[];
}
