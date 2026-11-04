import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CostOperationalService } from './cost-operational.service';
import { CreateCostOperationalDto } from './dto/create-cost-operational.dto';
import { UpdateCostOperationalDto } from './dto/create-cost-operational.dto';
import { GetCostOperationalFilterDTO } from './dto/get-cost-operational.dto';

@Controller('cost-operational')
export class CostOperationalController {
  constructor(
    private readonly costOperationalService: CostOperationalService,
  ) {}

  @Post()
  create(@Body() createCostOperationalDto: CreateCostOperationalDto) {
    return this.costOperationalService.create(createCostOperationalDto);
  }

  @Get()
  findAll(@Query() filter: GetCostOperationalFilterDTO) {
    const monthNumber = Number(filter.month);
    const yearNumber = Number(filter.year);

    if (
      !/^\d{1,2}$/.test(filter.month ?? '') ||
      !/^\d{4}$/.test(filter.year ?? '') ||
      !Number.isInteger(monthNumber) ||
      monthNumber < 1 ||
      monthNumber > 12 ||
      yearNumber < 1900 ||
      yearNumber > 9999
    ) {
      throw new BadRequestException(
        'month harus 1-12 dan year harus berupa tahun yang valid',
      );
    }

    return this.costOperationalService.findAll(monthNumber, yearNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costOperationalService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCostOperationalDto: UpdateCostOperationalDto,
  ) {
    return this.costOperationalService.update(id, updateCostOperationalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costOperationalService.remove(id);
  }
}
