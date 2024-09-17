import { Injectable, BadRequestException } from '@nestjs/common';
import { BceService } from '../bce.provider';

@Injectable()
export class EmailService {
  private readonly bucketName = 'artttoo-waitlist';
  private readonly fileName = 'email.txt';

  constructor(private readonly bceService: BceService) {}

  // 校验邮箱格式
  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private async getEmails(): Promise<string[]> {
    try {
      const fileContent = await this.bceService.getFileAsString(
        this.bucketName,
        this.fileName,
      );
      return fileContent.split('\n').filter((email) => email.trim() !== '');
    } catch (error) {
      if (error.code === 'NoSuchKey') {
        // File doesn't exist, return an empty array
        return [];
      }
      throw error;
    }
  }

  async registerEmail(email: string): Promise<any> {
    if (!this.validateEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    const emails = await this.getEmails();
    if (emails.includes(email)) {
      throw new BadRequestException('Email already exists');
    }

    emails.push(email);
    const fileContent = emails.join('\n');
    await this.bceService.uploadFileFromString(
      this.bucketName,
      this.fileName,
      fileContent,
    );
    return 'Successfully registered';
  }

  async getAllEmails(): Promise<string[]> {
    return this.getEmails();
  }
}
