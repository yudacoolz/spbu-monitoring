import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateFuelProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  selling_price: number;

  @IsNumber()
  @Min(1)
  cost_price: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateFuelProductDto extends PartialType(CreateFuelProductDto) {}
