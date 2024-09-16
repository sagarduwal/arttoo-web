import { Controller, Post, Body, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
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
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
