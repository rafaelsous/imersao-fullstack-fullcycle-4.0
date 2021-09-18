import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Report } from './entities/report.entity';

@Module({
  imports: [SequelizeModule.forFeature([Report])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
