import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ConnectionFactoryService } from './connection-factory.service';

describe('ConnectionFactory Service', () => {
  beforeEachProviders(() => [ConnectionFactoryService]);

  it('should ...',
      inject([ConnectionFactoryService], (service: ConnectionFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
