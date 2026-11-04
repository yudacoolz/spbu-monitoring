import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateFuelNozzleDto {
  @IsString()
  @IsNotEmpty()
  pump_code: string;

  @IsString()
  @IsNotEmpty()
  nozzle_code: string;

  @IsUUID()
  product_id: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean = true;
}

export class UpdateFuelNozzleDto extends PartialType(CreateFuelNozzleDto) {}
