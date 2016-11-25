import { Component, OnInit, Input } from '@angular/core';
import { QuestionControlService } from './../../services/question-control.service';
import * as _ from 'lodash';

@Component({
  selector: 'c-section-manager',
  templateUrl: './section-manager.component.html',
  styleUrls: ['./section-manager.component.scss']
})
export class SectionManagerComponent implements OnInit {
  @Input() sections: any[] = [];
  _sectionArr: any[] = [];

  constructor(
    private questionControlService: QuestionControlService
  ) { }

  ngOnInit() {
    console.log(this.sections);
    _.forEach(this.sections, (section) => {
      this._sectionArr.push(
        _.assign(section, {
          questions: this.questionControlService.createQuestionsFromJSON(section.fields)
        }));
    })
  }

  formStatusUpdated(status) {
    // console.log(status);
  }

}
