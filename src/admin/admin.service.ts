import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AdminService {
  private readonly filePath = path.join(__dirname, '..', '..', 'emails.txt');
  private readonly adminPassword = 'arttooemail'; // 你的管理员密码

  private validatePassword(password: string): boolean {
    return password === this.adminPassword;
  }

  getEmails(password: string): string {
    if (!this.validatePassword(password)) {
      throw new UnauthorizedException('Invalid password');
    }

    if (fs.existsSync(this.filePath)) {
      return fs.readFileSync(this.filePath, 'utf-8');
    } else {
      return 'No emails found';
    }
  }
}
