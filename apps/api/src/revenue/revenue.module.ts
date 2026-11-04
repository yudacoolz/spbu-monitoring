import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtherRevenue } from './entities/other-revenue.entity';
import { FuelNozzle } from './entities/fuel-nozzle.entity';
import { FuelProduct } from './entities/fuel-product.entity';
import { FuelSaleTransaction } from './entities/fuel-sale-transaction.entity';
import { ShiftRevenue } from './entities/revenue-shift.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OtherRevenue,
      FuelNozzle,
      FuelProduct,
      FuelSaleTransaction,
      ShiftRevenue,
    ]),
  ],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class RevenueModule {}
