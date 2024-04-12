import { Test, TestingModule } from '@nestjs/testing';
import { EnviromentConfigService } from './enviroment-config.service';

describe('EnviromentConfigService', () => {
  let service: EnviromentConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnviromentConfigService],
    }).compile();

    service = module.get<EnviromentConfigService>(EnviromentConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
