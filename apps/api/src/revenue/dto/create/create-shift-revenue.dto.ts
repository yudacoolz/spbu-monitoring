import { PartialType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateShiftRevenue {
  @IsString()
  @IsNotEmpty()
  operator_name: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  shift_number: number;

  @IsDateString()
  shift_date: string;

  @IsDateString()
  started_at: string;

  @IsDateString()
  @IsOptional()
  ended_at?: string;
}

export class UpdateShiftRevenue extends PartialType(CreateShiftRevenue) {}
