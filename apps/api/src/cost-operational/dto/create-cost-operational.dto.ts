import { PartialType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateCostOperationalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @IsDateString()
  @IsNotEmpty()
  expense_date: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateCostOperationalDto extends PartialType(
  CreateCostOperationalDto,
) {}
