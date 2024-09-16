import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [EmailModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
