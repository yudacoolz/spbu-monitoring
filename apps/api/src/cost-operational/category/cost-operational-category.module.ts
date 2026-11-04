import { Module } from '@nestjs/common';
import { CostOperationalCategoryService } from './cost-operational-category.service';
import { CostOperationalCtgController } from './cost-operational-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationalCostCategory } from './entity/cost-operational-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperationalCostCategory])],
  controllers: [CostOperationalCtgController],
  providers: [CostOperationalCategoryService],
})
export class CostOperationalCategoryModule {}
