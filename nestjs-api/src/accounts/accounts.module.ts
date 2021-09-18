import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account } from './entities/account.entity';
import { MyAccountController } from './my-account/my-account.controller';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  controllers: [AccountsController, MyAccountController],
  providers: [AccountsService],
})
export class AccountsModule {}
