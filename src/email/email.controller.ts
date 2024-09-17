import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { Logger } from '@nestjs/common';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  private logger = new Logger('MyApp');

  @Post('register')
  async register(@Body('email') email: string): Promise<string> {
    return this.emailService.registerEmail(email);
  }

  @Get()
  async getAllEmails(): Promise<string[]> {
    return this.emailService.getAllEmails();
  }
}
