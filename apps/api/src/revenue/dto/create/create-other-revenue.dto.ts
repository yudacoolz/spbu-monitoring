import { PartialType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateOtherRevenueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  revenue_date: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateOtherRevenueDto extends PartialType(CreateOtherRevenueDto) {}
