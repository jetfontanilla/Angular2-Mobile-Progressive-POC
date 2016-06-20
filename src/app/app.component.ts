import { Component, OnInit, Input } from '@angular/core';
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';
import { ConnectionFactoryService } from './shared/connection-factory.service';
import { VocabularyQuizService } from './models/bridge/vocabulary-quiz.service';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    template: `
  <h1>
    {{title}}
  </h1>
  <div>
  {{activities}}
</div>
  `,
    styles: [],
    directives: [APP_SHELL_DIRECTIVES],
    providers: [ConnectionFactoryService, VocabularyQuizService]
})
export class AppComponent implements OnInit {
    @Input() activityId: number;

    title = 'learn-progressive-app works!';
    errorMessage: string;
    activities: Object;

    constructor(private vocabularyQuizService: VocabularyQuizService) {

    }

    ngOnInit() {
        // get directive wordhead or activityid
        if (this.activityId) {
            console.log(this.activityId)
            this.vocabularyQuizService
                .getByActivityId(this.activityId)
                .subscribe(
                    activities => this.activities = activities,
                    error => this.errorMessage = <any>error
                );
        }
    }
}