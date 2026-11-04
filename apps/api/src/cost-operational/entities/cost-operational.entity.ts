import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OperationalCostCategory } from '../category/entity/cost-operational-category.entity';

@Entity()
export class CostOperational {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'uuid' })
  category_id: string;

  @ManyToOne(() => OperationalCostCategory, (category) => category.costs, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: OperationalCostCategory;

  @Column({ type: 'date' })
  expense_date: string;

  @Column()
  amount: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
