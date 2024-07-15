import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

import { NKE } from './data/NKE_DATA';
import { APPL } from './data/APPL_DATA';
import { SBUX } from './data/SBUX_DATA';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getStocks(symbol): Promise<
    {
      date: string;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
    }[]
  > {
    return new Promise(async (resolve, reject) => {
      //cq9ugdpr01qi4425gk6gcq9ugdpr01qi4425gk70
      const apiKey = 'Y6X43U1JBK4E7H8J'; //'Z0HCOII2M54U7EDT';
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

      const data = await lastValueFrom(
        this.httpService.get(url).pipe(map((response) => response.data)),
      );

      if (data['Information'] || data['Error Message']) {
        switch (symbol) {
          case 'AAPL':
            resolve(APPL);
            break;
          case 'NKE':
            resolve(NKE);
            break;
          case 'SBUX':
            resolve(SBUX);
            break;
          default:
            resolve([]);
            break;
        }
      } else {
        resolve(this.processStockData(data));
      }
    });
  }
  processStockData(data: any) {
    const timeSeries = data['Time Series (Daily)'];
    const processedData = Object.keys(timeSeries).map((date) => ({
      date,
      open: parseFloat(timeSeries[date]['1. open']),
      high: parseFloat(timeSeries[date]['2. high']),
      low: parseFloat(timeSeries[date]['3. low']),
      close: parseFloat(timeSeries[date]['4. close']),
      volume: parseInt(timeSeries[date]['5. volume']),
    }));

    return processedData;
  }
}
