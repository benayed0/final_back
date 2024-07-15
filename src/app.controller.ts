import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('stocks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':symbol')
  async getStocks(@Param('symbol') symbol: string) {
    const stocks = await this.appService.getStocks(symbol);
    return stocks;
  }
}
