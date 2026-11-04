import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  min,
} from 'class-validator';

export class PaginationQueryDto {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsInt()
  @Type(() => Number)
  @Min(10)
  @Max(50)
  limit: number = 10;

  @IsOptional()
  @IsString()
  search?: number;

  @IsOptional()
  @IsString()
  sort?: number;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'desc';
}
