import { Injectable } from '@angular/core';
import { ConnectionFactoryService } from '../../shared/connection-factory.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VocabularyQuizService {

    constructor(private connection: ConnectionFactoryService) {
    }

    getByActivityId(activityId: number): Observable<Object> {
        return this.connection
            .service('bridge')
            .path('/content/vocabularyQuiz')
            .get({
                complete: true,
                activityID: activityId
            });
    }

    getByWordHeadIds(wordHeadIds: number[]): Observable<Object> {
        return this.connection
            .service('bridge')
            .path('/content/vocabularyQuiz')
            .get({
                complete: true,
                wordHeadIDs: wordHeadIds.join(',')
            });
    }
}
