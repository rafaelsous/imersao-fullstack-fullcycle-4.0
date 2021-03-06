import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsService } from './transactions.service';
import { JwtAuthGuard } from './../auth/jwt-strategy/jwt-auth.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { TenantService } from './../tenant/tenant/tenant.service';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly tenantService: TenantService,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }
}
