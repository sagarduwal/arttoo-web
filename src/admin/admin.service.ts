import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class AdminService {
  private readonly adminPassword = 'arttooemail'; // 你的管理员密码

  constructor(private readonly emailService: EmailService) {}

  private validatePassword(password: string): boolean {
    return password === this.adminPassword;
  }

  getEmails(password: string): Promise<string[]> {
    if (!this.validatePassword(password)) {
      throw new UnauthorizedException('Invalid password');
    }
    return this.emailService.getAllEmails();
  }
}
