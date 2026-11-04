import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FuelNozzle } from './fuel-nozzle.entity';
import { FuelSaleTransaction } from './fuel-sale-transaction.entity';

@Entity('fuel_products')
export class FuelProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  selling_price: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  cost_price: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @OneToMany(() => FuelNozzle, (nozzle) => nozzle.product)
  nozzles: FuelNozzle[];

  @OneToMany(() => FuelSaleTransaction, (transaction) => transaction.product)
  transactions: FuelSaleTransaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
