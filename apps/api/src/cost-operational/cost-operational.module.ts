import { Module } from '@nestjs/common';
import { CostOperationalService } from './cost-operational.service';
import { CostOperationalController } from './cost-operational.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostOperational } from './entities/cost-operational.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CostOperational])],
  controllers: [CostOperationalController],
  providers: [CostOperationalService],
})
export class CostOperationalModule {}
