import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCostOperationalDto,
  UpdateCostOperationalDto,
} from './dto/create-cost-operational.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostOperational } from './entities/cost-operational.entity';

@Injectable()
export class CostOperationalService {
  constructor(
    @InjectRepository(CostOperational)
    private readonly repo: Repository<CostOperational>,
  ) {}

  async create(dto: CreateCostOperationalDto) {
    const { name, category_id, expense_date, amount, description } = dto;
    const cost = this.repo.create({
      name,
      category_id,
      expense_date,
      amount,
      description,
    });
    await this.repo.save(cost);
    return cost;
  }

  async findAll(month: number, year: number) {
    // const data = await this.repo.find({
    //   relations: { category: true },
    //   order: { created_at: 'DESC' },
    // });
    // return data;

    // JavaScript months are zero-based:
    // 0 = January, 3 = April, 11 = December.

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    console.log(startDate);
    console.log(endDate);

    const rows = await this.repo
      .createQueryBuilder('cost')
      .innerJoin('cost.category', 'category')
      .select('category.id', 'categoryId')
      .addSelect('category.name', 'categoryName')
      .addSelect('COUNT(cost.id)', 'itemCount')
      .addSelect(
        `JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', cost.id,
        'name', cost.name,
        'category_id', cost.category_id,
        'expense_date', cost.expense_date,
        'description', cost.description,
        'amount', cost.amount
      )
    )`,
        'items',
      )
      .addSelect('COALESCE(SUM(cost.amount), 0)', 'total')
      .where('cost.expense_date >= :startDate', { startDate })
      .andWhere('cost.expense_date < :endDate', { endDate })
      .groupBy('category.id')
      .addGroupBy('category.name')
      .getRawMany();

    const data = rows.map((row) => ({
      categoryId: row.categoryId,
      categoryName: row.categoryName,
      itemCount: Number(row.itemCount),
      items: row.items,
      total: Number(row.total),
    }));

    return data;
  }

  async findOne(id: string) {
    const data = await this.repo.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!data) throw new NotFoundException('Data tidak ditemukan');
    return data;
  }

  async update(id: string, dto: UpdateCostOperationalDto) {
    const prevData = await this.findOne(id);

    prevData.name = dto.name ?? prevData.name;
    prevData.expense_date = dto.expense_date ?? prevData.expense_date;
    prevData.amount = dto.amount ?? prevData.amount;
    prevData.description = dto.description ?? prevData.description;

    if (dto.category_id && dto.category_id !== prevData.category_id) {
      prevData.category_id = dto.category_id;
      // loaded relation would override category_id on save
      delete (prevData as Partial<CostOperational>).category;
    }

    await this.repo.save(prevData);
    return this.findOne(id);
  }

  // async update(id: string, dto: UpdateCostOperationalDto) {
  //    await this.findOne(id);

  //   await this.repo.update(id, dto);
  //   return this.findOne(id);
  // }

  async remove(id: string) {
    const data = await this.findOne(id);

    await this.repo.remove(data);
    return;
  }
}
