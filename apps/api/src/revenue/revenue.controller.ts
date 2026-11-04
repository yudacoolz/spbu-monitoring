import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RevenueService } from './revenue.service';
import {
  CreateFuelNozzleDto,
  UpdateFuelNozzleDto,
} from './dto/create/create-fuel-nozzle.dto';
import {
  CreateFuelProductDto,
  UpdateFuelProductDto,
} from './dto/create/create-fuel-product.dto';
import {
  CreateFuelSaleTransactionDto,
  UpdateFuelSaleTransactionDto,
} from './dto/create/create-fuel-sale-transaction.dto';
import {
  CreateOtherRevenueDto,
  UpdateOtherRevenueDto,
} from './dto/create/create-other-revenue.dto';
import {
  CreateShiftRevenue,
  UpdateShiftRevenue,
} from './dto/create/create-shift-revenue.dto';
import { GetFuelNozzlesDto } from './dto/get/get-fuel-nozzle.dto';
import { GetFuelProductsDto } from './dto/get/get-fuel-product.dto';
import { GetFuelSaleTransactionsDto } from './dto/get/get-fuel-sale-transaction.dto';
import { GetOtherRevenuesDto } from './dto/get/get-other-revenue.dto';
import { GetShiftRevenuesDto } from './dto/get/get-shift-revenue.dto';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  // Fuel Product
  @Post('fuel-products')
  createFuelProduct(@Body() dto: CreateFuelProductDto) {
    return this.revenueService.createFuelProduct(dto);
  }

  @Get('fuel-products')
  findAllFuelProduct(@Query() filter: GetFuelProductsDto) {
    return this.revenueService.findAllFuelProduct(filter);
  }

  @Get('fuel-products/:id')
  findOneFuelProduct(@Param('id') id: string) {
    return this.revenueService.findOneFuelProduct(id);
  }

  @Patch('fuel-products/:id')
  updateFuelProduct(
    @Param('id') id: string,
    @Body() dto: UpdateFuelProductDto,
  ) {
    return this.revenueService.updateFuelProduct(id, dto);
  }

  @Delete('fuel-products/:id')
  removeFuelProduct(@Param('id') id: string) {
    return this.revenueService.removeFuelProduct(id);
  }

  // Fuel Nozzle
  @Post('fuel-nozzles')
  createFuelNozzle(@Body() dto: CreateFuelNozzleDto) {
    return this.revenueService.createFuelNozzle(dto);
  }

  @Get('fuel-nozzles')
  findAllFuelNozzle(@Query() filter: GetFuelNozzlesDto) {
    return this.revenueService.findAllFuelNozzle(filter);
  }

  @Get('fuel-nozzles/:id')
  findOneFuelNozzle(@Param('id') id: string) {
    return this.revenueService.findOneFuelNozzle(id);
  }

  @Patch('fuel-nozzles/:id')
  updateFuelNozzle(@Param('id') id: string, @Body() dto: UpdateFuelNozzleDto) {
    return this.revenueService.updateFuelNozzle(id, dto);
  }

  @Delete('fuel-nozzles/:id')
  removeFuelNozzle(@Param('id') id: string) {
    return this.revenueService.removeFuelNozzle(id);
  }

  // Fuel Revenue

  @Post('fuel-revenues')
  createFuelRevenue(@Body() dto: CreateFuelSaleTransactionDto) {
    return this.revenueService.createFuelRevenue(dto);
  }

  @Get('fuel-revenues')
  findAllFuelRevenue(@Query() filter: GetFuelSaleTransactionsDto) {
    return this.revenueService.findAllFuelRevenue(filter);
  }

  @Get('fuel-revenues/:id')
  findOneFuelRevenue(@Param('id') id: string) {
    return this.revenueService.findOneFuelRevenue(id);
  }

  @Patch('fuel-revenues/:id')
  updateFuelRevenue(
    @Param('id') id: string,
    @Body() dto: UpdateFuelSaleTransactionDto,
  ) {
    return this.revenueService.updateFuelRevenue(id, dto);
  }

  @Delete('fuel-revenues/:id')
  removeFuelRevenue(@Param('id') id: string) {
    return this.revenueService.removeFuelRevenue(id);
  }

  // Other Revenue

  @Post('other-revenues')
  createOtherRevenue(@Body() dto: CreateOtherRevenueDto) {
    return this.revenueService.createOtherRevenue(dto);
  }

  @Get('other-revenues')
  findAllOtherRevenue(@Query() filter: GetOtherRevenuesDto) {
    return this.revenueService.findAllOtherRevenue(filter);
  }

  @Get('other-revenues/:id')
  findOneOtherRevenue(@Param('id') id: string) {
    return this.revenueService.findOneOtherRevenue(id);
  }

  @Patch('other-revenues/:id')
  updateOtherRevenue(
    @Param('id') id: string,
    @Body() dto: UpdateOtherRevenueDto,
  ) {
    return this.revenueService.updateOtherRevenue(id, dto);
  }

  @Delete('other-revenues/:id')
  removeOtherRevenue(@Param('id') id: string) {
    return this.revenueService.removeOtherRevenue(id);
  }

  // Shift Revenue
  @Post('shift-revenues')
  createShiftRevenue(@Body() dto: CreateShiftRevenue) {
    return this.revenueService.createShiftRevenue(dto);
  }

  @Get('shift-revenues')
  findAllShiftRevenue(@Query() filter: GetShiftRevenuesDto) {
    return this.revenueService.findAllShiftRevenue(filter);
  }

  @Get('shift-revenues/:id')
  findOneShiftRevenue(@Param('id') id: string) {
    return this.revenueService.findOneShiftRevenue(id);
  }

  @Patch('shift-revenues/:id')
  updateShiftRevenue(@Param('id') id: string, @Body() dto: UpdateShiftRevenue) {
    return this.revenueService.updateShiftRevenue(id, dto);
  }

  @Delete('shift-revenues/:id')
  removeShiftRevenue(@Param('id') id: string) {
    return this.revenueService.removeShiftRevenue(id);
  }
}
