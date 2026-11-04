import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { FuelNozzle } from './entities/fuel-nozzle.entity';
import { FuelProduct } from './entities/fuel-product.entity';
import { OtherRevenue } from './entities/other-revenue.entity';
import { ShiftRevenue } from './entities/revenue-shift.entity';
import { FuelSaleTransaction } from './entities/fuel-sale-transaction.entity';
import {
  CreateFuelNozzleDto,
  UpdateFuelNozzleDto,
} from './dto/create/create-fuel-nozzle.dto';
import { GetFuelNozzlesDto } from './dto/get/get-fuel-nozzle.dto';
import {
  CreateFuelSaleTransactionDto,
  UpdateFuelSaleTransactionDto,
} from './dto/create/create-fuel-sale-transaction.dto';
import { GetFuelSaleTransactionsDto } from './dto/get/get-fuel-sale-transaction.dto';
import {
  CreateOtherRevenueDto,
  UpdateOtherRevenueDto,
} from './dto/create/create-other-revenue.dto';
import { GetOtherRevenuesDto } from './dto/get/get-other-revenue.dto';
import {
  CreateShiftRevenue,
  UpdateShiftRevenue,
} from './dto/create/create-shift-revenue.dto';
import { GetShiftRevenuesDto } from './dto/get/get-shift-revenue.dto';
import {
  CreateFuelProductDto,
  UpdateFuelProductDto,
} from './dto/create/create-fuel-product.dto';
import { GetFuelProductsDto } from './dto/get/get-fuel-product.dto';

@Injectable()
export class RevenueService {
  private readonly logger = new Logger(RevenueService.name);

  constructor(
    @InjectRepository(FuelNozzle)
    private readonly fuelNozzleRepository: Repository<FuelNozzle>,
    @InjectRepository(FuelProduct)
    private readonly fuelProductRepository: Repository<FuelProduct>,
    @InjectRepository(FuelSaleTransaction)
    private readonly fuelSaleRepository: Repository<FuelSaleTransaction>,
    @InjectRepository(ShiftRevenue)
    private readonly shiftRepository: Repository<ShiftRevenue>,
    @InjectRepository(OtherRevenue)
    private readonly otherRevenueRepository: Repository<OtherRevenue>,
  ) {}

  // Fuel Product
  async createFuelProduct(dto: CreateFuelProductDto) {
    return 'This action adds a new revenue';
  }

  async findAllFuelProduct(filter: GetFuelProductsDto) {
    return `This action returns all revenue`;
  }

  async findOneFuelProduct(id: string) {
    return `This action returns a #${id} revenue`;
  }

  async updateFuelProduct(id: string, dto: UpdateFuelProductDto) {
    return `This action updates a #${id} revenue`;
  }

  async removeFuelProduct(id: string) {
    return `This action removes a #${id} revenue`;
  }

  // Fuel Nozzle

  async createFuelNozzle(dto: CreateFuelNozzleDto) {
    const { nozzle_code, product_id, pump_code, is_active } = dto;
    const data = this.fuelNozzleRepository.create({
      nozzle_code,
      product_id,
      pump_code,
      is_active,
    });
    return data;
  }

  async findAllFuelNozzle(filter: GetFuelNozzlesDto) {
    const data = await this.fuelNozzleRepository.find();
    return data;
  }

  async findOneFuelNozzle(id: string) {
    const data = await this.fuelNozzleRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException('Data tidak ditemukan');
    return data;
  }

  async updateFuelNozzle(id: string, dto: UpdateFuelNozzleDto) {
    const findData = await this.findOneFuelNozzle(id);

    findData.pump_code = dto.pump_code ?? findData.pump_code;
    findData.is_active = dto.is_active ?? findData.is_active;
    findData.nozzle_code = dto.nozzle_code ?? findData.nozzle_code;
    findData.product_id = dto.product_id ?? findData.product_id;

    const data = this.fuelNozzleRepository.save(findData);
    return data;
  }

  async removeFuelNozzle(id: string) {
    const data = await this.findOneFuelNozzle(id);
    await this.fuelNozzleRepository.remove(data);
    return;
  }

  // Fuel Revenue

  async createFuelRevenue(dto: CreateFuelSaleTransactionDto) {
    return 'This action adds a new revenue';
  }

  async findAllFuelRevenue(filter: GetFuelSaleTransactionsDto) {
    return `This action returns all revenue`;
  }

  async findOneFuelRevenue(id: string) {
    return `This action returns a #${id} revenue`;
  }

  async updateFuelRevenue(id: string, dto: UpdateFuelSaleTransactionDto) {
    return `This action updates a #${id} revenue`;
  }

  async removeFuelRevenue(id: string) {
    return `This action removes a #${id} revenue`;
  }

  // Other Revenue

  async createOtherRevenue(dto: CreateOtherRevenueDto) {
    const { amount, name, revenue_date, description } = dto;
    const data = await this.otherRevenueRepository.create({
      amount,
      name,
      revenue_date,
      description,
    });
    await this.otherRevenueRepository.save(data);
    return data;
  }

  async findAllOtherRevenue(filter: GetOtherRevenuesDto) {
    // Validasi Date
    const where: FindOptionsWhere<OtherRevenue> = {};

    if (filter.start_date && filter.end_date) {
      where.revenue_date = Between(filter.start_date, filter.end_date);
    } else if (filter.start_date) {
      where.revenue_date = MoreThanOrEqual(filter.start_date);
    } else if (filter.end_date) {
      where.revenue_date = LessThanOrEqual(filter.end_date);
    }

    // Query
    const data = await this.otherRevenueRepository.find({
      where,
      order: { revenue_date: 'DESC' },
    });

    // Count Total Amount
    const amountItems = data.map((item) => item.amount);
    const totalAmount = amountItems.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    const countData = data.length;

    const dataSummary = { data, countData, totalAmount };
    this.logger.log(`Data Get Results : ${dataSummary}`);

    // return data;
    return dataSummary;
  }

  async findOneOtherRevenue(id: string) {
    const data = await this.otherRevenueRepository.findOne({
      where: { id: id },
    });
    if (!data) throw new NotFoundException('Data tidak ditemukan');

    return data;
  }

  async updateOtherRevenue(id: string, dto: UpdateOtherRevenueDto) {
    const pervData = await this.findOneOtherRevenue(id);

    pervData.amount = dto.amount ?? pervData.amount;
    pervData.name = dto.name ?? pervData.name;
    pervData.description = dto.description ?? pervData.description;
    pervData.revenue_date = dto.revenue_date ?? pervData.revenue_date;

    await this.otherRevenueRepository.save(pervData);
    return this.findOneOtherRevenue(id);
  }

  async removeOtherRevenue(id: string) {
    const foundData = await this.findOneOtherRevenue(id);
    return await this.otherRevenueRepository.remove(foundData);
  }

  // Shift Revenue

  async createShiftRevenue(dto: CreateShiftRevenue) {
    return 'This action adds a new revenue';
  }

  async findAllShiftRevenue(filter: GetShiftRevenuesDto) {
    return `This action returns all revenue`;
  }

  async findOneShiftRevenue(id: string) {
    return `This action returns a #${id} revenue`;
  }

  async updateShiftRevenue(id: string, dto: UpdateShiftRevenue) {
    return `This action updates a #${id} revenue`;
  }

  async removeShiftRevenue(id: string) {
    return `This action removes a #${id} revenue`;
  }
}
