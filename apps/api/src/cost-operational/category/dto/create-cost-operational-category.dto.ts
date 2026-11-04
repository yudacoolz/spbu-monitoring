import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCostOperationalCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  is_active?: boolean = true;

  // @IsNumber()
  // @IsOptional()
  // @Min(0)
  // cost?: number | null;
}

export class UpdateCostOperationalCategoryDto extends PartialType(
  CreateCostOperationalCategoryDto,
) {}
