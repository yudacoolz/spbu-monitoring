import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CostOperationalCategoryService } from './cost-operational-category.service';
import {
  CreateCostOperationalCategoryDto,
  UpdateCostOperationalCategoryDto,
} from './dto/create-cost-operational-category.dto';

@ApiTags('cost-operational-category')
@Controller('cost-operational-category')
export class CostOperationalCtgController {
  constructor(
    private readonly costOperationalCtgService: CostOperationalCategoryService,
  ) {}

  @Post()
  create(
    @Body() CreateCostOperationalCategoryDto: CreateCostOperationalCategoryDto,
  ) {
    return this.costOperationalCtgService.create(
      CreateCostOperationalCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.costOperationalCtgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costOperationalCtgService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateCostOperationalCategoryDto: UpdateCostOperationalCategoryDto,
  ) {
    return this.costOperationalCtgService.update(
      id,
      UpdateCostOperationalCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costOperationalCtgService.remove(id);
  }
}
