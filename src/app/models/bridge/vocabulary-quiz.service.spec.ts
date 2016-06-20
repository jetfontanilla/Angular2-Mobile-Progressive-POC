import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { VocabularyQuizService } from './vocabulary-quiz.service';

describe('VocabularyQuiz Service', () => {
  beforeEachProviders(() => [VocabularyQuizService]);

  it('should ...',
      inject([VocabularyQuizService], (service: VocabularyQuizService) => {
    expect(service).toBeTruthy();
  }));
});
