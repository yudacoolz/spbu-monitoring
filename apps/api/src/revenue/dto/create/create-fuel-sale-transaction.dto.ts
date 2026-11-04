import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateFuelSaleTransactionDto {
  @IsString()
  @IsNotEmpty()
  transaction_code: string;

  @IsUUID()
  product_id: string;

  @IsUUID()
  nozzle_id: string;

  @IsUUID()
  shift_id: string;

  @IsDateString()
  @IsNotEmpty()
  transaction_date: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  totalizer_start: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 3 })
  @Min(0)
  totalizer_end: number;
}

export class UpdateFuelSaleTransactionDto extends PartialType(
  CreateFuelSaleTransactionDto,
) {}
