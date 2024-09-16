import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private readonly filePath = path.join(__dirname, '..', '..', 'emails.txt');

  // 校验邮箱格式
  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // 检查邮箱是否已存在
  private isEmailDuplicate(email: string): boolean {
    const emails = fs.readFileSync(this.filePath, 'utf-8').split('\n');
    return emails.includes(email);
  }

  async registerEmail(email: string): Promise<void> {
    if (!this.validateEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (this.isEmailDuplicate(email)) {
      throw new BadRequestException('Email already exists');
    }

    // Append the email to the file
    fs.appendFileSync(this.filePath, `${email}\n`);
  }
}
