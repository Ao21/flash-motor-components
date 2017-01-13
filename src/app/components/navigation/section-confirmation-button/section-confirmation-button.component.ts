import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { coerceBooleanProperty } from './../../../core/coersion/boolean-property';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AppState from './../../../stores/reducer';

import { StageManagerService } from './../../../services/stage-manager.service';
import { SectionControlService } from './../../../services/section-control.service';

@Component({
	selector: 'section-conf-button',
	templateUrl: './section-confirmation-button.component.html',
	styleUrls: ['./section-confirmation-button.component.scss']
})
export class SectionConfirmationButtonComponent implements OnInit, OnChanges {
	@Input() text: string;
	@Input() valid: boolean = true;
	@Input() hidden: boolean = false;
	@Input() page: Page;

	private _dontUpdateStore: boolean = false;
	@Input()
	set dontUpdateStore(v) {
		this._dontUpdateStore = coerceBooleanProperty(v);
	}
	get dontUpdateStore() {
		return this._dontUpdateStore;
	}


	constructor(
		private router: Router,
		private stageManagerService: StageManagerService,
		private sectionControlService: SectionControlService,
		private store: Store<AppState.State>
	) { }

	confirm() {
		let cPage = this.page;
		this.stageManagerService.onPageComplete
			.take(1)
			.filter((x) => { return this.page !== null; })
			.delay(300)
			.subscribe(() => {
				this.router.navigateByUrl(cPage.uiOptions.nextPage)
			});

		this.stageManagerService.completePage(this.page.id, this.page.uiOptions.nextPage);
		if (!this.dontUpdateStore) {
			this.sectionControlService.updatePage(this.page.id).subscribe((next) => {
			});
		}

	}

	ngOnInit() {
	}

	ngOnChanges() {
	}

}
