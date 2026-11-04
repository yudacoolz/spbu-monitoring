import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CostOperational } from '../entities/cost-operational.entity';
import { MetaDto } from '../../common/dto/meta.dto';

export class GetCostOperationalFilterDTO {
  @IsNotEmpty()
  @IsString()
  month: string;

  @IsNotEmpty()
  @IsString()
  year: string;
}

export class GetCostOperationalResponse {
  data: CostOperational;
  meta: MetaDto;
}
