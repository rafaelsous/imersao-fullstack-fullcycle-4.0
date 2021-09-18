import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService]
})
export class AccountsModule {}
