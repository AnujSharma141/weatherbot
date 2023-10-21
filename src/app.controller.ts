import { Controller, Get } from '@nestjs/common';
import { UserService } from './service/user.service';
@Controller()
export class AppController {
  constructor(private readonly users: UserService) {}

  @Get('/users')
  getUsers(): Promise<any> {
    return this.users.getUsers();
  }
}
