import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('register')
  async register(@Body('email') email: string): Promise<string> {
    try {
      await this.emailService.registerEmail(email);
      return 'Email registered successfully!';
    } catch (error) {
      throw error;
    }
  }
}
