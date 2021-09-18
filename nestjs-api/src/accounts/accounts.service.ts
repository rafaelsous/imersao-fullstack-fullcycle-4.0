import { Injectable } from '@nestjs/common';

import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account) private accountModel: typeof Account) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountModel.create(createAccountDto);
  }

  findAll() {
    return this.accountModel.findAll();
  }

  findOne(id: string) {
    return this.accountModel.findByPk(id, { rejectOnEmpty: true });
  }
}
