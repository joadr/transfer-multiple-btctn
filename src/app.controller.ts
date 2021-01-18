import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/createAddress')
  createAddress() {
    return this.appService.createAddress();
  }

  @Get('/sendMultiple')
  sendMultiple() {
    return this.appService.sendMultiple();
  }
}
