import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { Logger } from '@nestjs/common';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  private logger = new Logger('MyApp');

  @Post('register')
  async register(@Body('email') email: string): Promise<string> {
    try {
      await this.emailService.registerEmail(email);
      return 'Email registered successfully!';
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
