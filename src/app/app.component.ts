import { Component, OnInit, Input } from '@angular/core';
import { APP_SHELL_DIRECTIVES } from '@angular/app-shell';
import { ConnectionFactoryService } from './shared/connection-factory.service';
import { VocabularyQuizService } from './models/bridge/vocabulary-quiz.service';
import { ActivityService } from './models/bridge/activity.service';

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
    providers: [ConnectionFactoryService, VocabularyQuizService, ActivityService]
})
export class AppComponent implements OnInit {
    @Input() activityId: number;
    @Input() dialogId: number = 19419

    title = 'learn-progressive-app works!';
    errorMessage: string;
    activities: Object;

    constructor(private vocabularyQuizService: VocabularyQuizService,
                private activityService: ActivityService) {

    }

    ngOnInit() {
        console.log('activityID', this.activityId)
        console.log('dialogID', this.dialogId)
        // get directive wordhead or activityid
        if (this.activityId) {

            this.vocabularyQuizService
                .getByActivityId(this.activityId)
                .subscribe(
                    activities => this.activities = activities,
                    error => this.errorMessage = <any>error
                );
        }

        if (this.dialogId) {

            this.activityService
                .getByDialogId(this.dialogId)
                .subscribe(
                    activities => this.activities = JSON.stringify(activities),
                    error => this.errorMessage = <any>error
                );
        }
    }
}