import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { BceService } from '../bce.provider';

@Module({
  controllers: [EmailController],
  providers: [EmailService, BceService],
  exports: [EmailService],
})
export class EmailModule {}
