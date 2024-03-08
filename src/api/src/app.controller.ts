import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(
    private configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.configService.get('DB_URL'));
    return this.appService.getHello();
  }
}
