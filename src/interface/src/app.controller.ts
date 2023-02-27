import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from '@service-template/core/user/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const user = new User({ name: 'Vitor' });
    console.log(user.props);
    return this.appService.getHello();
  }
}
