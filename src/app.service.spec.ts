import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AppService } from './app.service';
import { NKE } from './data/NKE_DATA';
import { APPL } from './data/APPL_DATA';
import { SBUX } from './data/SBUX_DATA';

describe('AppService', () => {
  let service: AppService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return predefined data for AAPL', async () => {
    const response: AxiosResponse = {
      data: { Information: 'This is a test' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    const result = await service.getStocks('AAPL');
    expect(result).toEqual(APPL);
  });

  it('should return predefined data for NKE', async () => {
    const response: AxiosResponse = {
      data: { Information: 'This is a test' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    const result = await service.getStocks('NKE');
    expect(result).toEqual(NKE);
  });

  it('should return predefined data for SBUX', async () => {
    const response: AxiosResponse = {
      data: { Information: 'This is a test' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    const result = await service.getStocks('SBUX');
    expect(result).toEqual(SBUX);
  });

  it('should process and return stock data', async () => {
    const mockData = {
      'Time Series (Daily)': {
        '2023-07-14': {
          '1. open': '150.00',
          '2. high': '155.00',
          '3. low': '149.00',
          '4. close': '152.00',
          '5. volume': '1000000',
        },
        '2023-07-13': {
          '1. open': '148.00',
          '2. high': '150.00',
          '3. low': '147.00',
          '4. close': '149.00',
          '5. volume': '800000',
        },
      },
    };

    const response: AxiosResponse = {
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };

    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    const result = await service.getStocks('TEST');
    expect(result).toEqual([
      {
        date: '2023-07-14',
        open: 150.0,
        high: 155.0,
        low: 149.0,
        close: 152.0,
        volume: 1000000,
      },
      {
        date: '2023-07-13',
        open: 148.0,
        high: 150.0,
        low: 147.0,
        close: 149.0,
        volume: 800000,
      },
    ]);
  });

  it('should return empty array if symbol is not recognized', async () => {
    const response: AxiosResponse = {
      data: { Information: 'This is a test' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

    const result = await service.getStocks('UNKNOWN');
    expect(result).toEqual([]);
  });
});
