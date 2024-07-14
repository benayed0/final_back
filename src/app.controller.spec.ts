import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NKE } from './data/NKE_DATA';
import { APPL } from './data/APPL_DATA';
import { SBUX } from './data/SBUX_DATA';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getStocks: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should return predefined data for AAPL', async () => {
    jest.spyOn(appService, 'getStocks').mockResolvedValue(APPL);

    const result = await appController.getStocks('AAPL');
    expect(result).toEqual(APPL);
  });

  it('should return predefined data for NKE', async () => {
    jest.spyOn(appService, 'getStocks').mockResolvedValue(NKE);

    const result = await appController.getStocks('NKE');
    expect(result).toEqual(NKE);
  });

  it('should return predefined data for SBUX', async () => {
    jest.spyOn(appService, 'getStocks').mockResolvedValue(SBUX);

    const result = await appController.getStocks('SBUX');
    expect(result).toEqual(SBUX);
  });

  it('should return processed stock data', async () => {
    const mockData = [
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
    ];

    jest.spyOn(appService, 'getStocks').mockResolvedValue(mockData);

    const result = await appController.getStocks('TEST');
    expect(result).toEqual(mockData);
  });

  it('should return an empty array for unknown symbols', async () => {
    jest.spyOn(appService, 'getStocks').mockResolvedValue([]);

    const result = await appController.getStocks('UNKNOWN');
    expect(result).toEqual([]);
  });
});
