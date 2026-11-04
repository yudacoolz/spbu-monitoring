import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FuelProduct } from './fuel-product.entity';
import { FuelNozzle } from './fuel-nozzle.entity';
import { ShiftRevenue } from './revenue-shift.entity';

@Entity('fuel_sale_transactions')
export class FuelSaleTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  transaction_code: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @ManyToOne(() => FuelProduct, (product) => product.transactions, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'product_id' })
  product: FuelProduct;

  @Column({ type: 'uuid' })
  nozzle_id: string;

  @ManyToOne(() => FuelNozzle, (nozzle) => nozzle.transactions, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'nozzle_id' })
  nozzle: FuelNozzle;

  @Column({ type: 'uuid' })
  shift_id: string;

  @ManyToOne(() => ShiftRevenue, (shift) => shift.transactions, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'shift_id' })
  shift: ShiftRevenue;

  @Column({ type: 'timestamptz' })
  transaction_date: Date;

  @Column()
  totalizer_start: number;

  @Column()
  totalizer_end: number;

  @Column()
  liters: number;

  @Column()
  selling_price_per_liter: number;

  @Column()
  cost_price_per_liter: number;

  @Column()
  total_amount: number;

  // @Column({ type: 'varchar', length: 30, nullable: true })
  // vehicle_plate: string | null;

  // @Column({ type: 'varchar', length: 100, nullable: true })
  // qr_code: string | null;

  @CreateDateColumn()
  created_at: Date;
}
