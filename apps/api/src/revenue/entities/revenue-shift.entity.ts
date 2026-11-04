import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FuelSaleTransaction } from './fuel-sale-transaction.entity';

@Entity('revenue_shifts')
export class ShiftRevenue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  shift_date: string;

  @Column({ type: 'smallint' })
  shift_number: number;

  @Column({ type: 'varchar', length: 100 })
  operator_name: string;

  @Column({ type: 'timestamptz' })
  started_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  ended_at: Date | null;

  @Column({ default: 'RUNNING' })
  status: string;

  @OneToMany(() => FuelSaleTransaction, (transaction) => transaction.shift)
  transactions: FuelSaleTransaction[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
