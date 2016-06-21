/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ActivityService } from './activity.service';

describe('Activity Service', () => {
  beforeEachProviders(() => [ActivityService]);

  it('should ...',
      inject([ActivityService], (service: ActivityService) => {
    expect(service).toBeTruthy();
  }));
});
