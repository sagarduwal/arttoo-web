import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('view-emails')
  viewEmails(@Body('password') password: string): string {
    try {
      return this.adminService.getEmails(password);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid password');
      }
      throw error;
    }
  }
}
