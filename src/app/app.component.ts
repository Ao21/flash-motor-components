import { Component, OnInit } from '@angular/core';
import { MojsInit } from './components/mojs/mojs-init';
import { ProductConfigService } from './services/product-config.service';

@Component({
	selector: 'mf-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	mojs: MojsInit = new MojsInit();

	constructor(
		private productConfigService: ProductConfigService
	) {
		productConfigService.init();
	}

	ngOnInit() {}
}
