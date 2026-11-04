import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCostOperationalCategoryDto,
  UpdateCostOperationalCategoryDto,
} from './dto/create-cost-operational-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationalCostCategory } from './entity/cost-operational-category.entity';

@Injectable()
export class CostOperationalCategoryService {
  constructor(
    @InjectRepository(OperationalCostCategory)
    private readonly repo: Repository<OperationalCostCategory>,
  ) {}

  async create(dto: CreateCostOperationalCategoryDto) {
    const { name } = dto;
    const category = this.repo.create({ name });
    await this.repo.save(category);
    return category;
  }

  async findAll() {
    const data = await this.repo.find({ order: { created_at: 'DESC' } });
    return data;
  }

  async findOne(id: string) {
    const data = await this.repo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Data tidak ditemukan');
    return data;
  }

  async update(id: string, dto: UpdateCostOperationalCategoryDto) {
    const category = await this.findOne(id);
    Object.assign(category, dto);

    return this.repo.save(category);
  }

  async remove(id: string) {
    const data = await this.findOne(id);

    await this.repo.remove(data);
    return;
  }
}
