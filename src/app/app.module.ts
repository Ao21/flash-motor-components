import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { TimelineModule } from './components/timeline/timeline.module';

import { AppComponent } from './app.component';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { MdCoreModule } from './core/';
import { routing, APP_ROUTING_PROVIDERS } from './app.routes';
import { SharedServicesModule } from './services/services.module';
import { PipeModules } from './core/pipes/pipe-modules';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './stores/reducer';

import { ProductConfigEffects, PageEffects } from './stores/effects';

import { SectionModules } from './sections/section.module';



@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		HttpModule,
		JsonpModule,
		CommonModule,
		PipeModules,
		SharedServicesModule.forRoot(),
		MdCoreModule.forRoot(),
		routing,
		StoreModule.provideStore(reducer),
		EffectsModule.run(ProductConfigEffects),
		EffectsModule.run(PageEffects),
		TimelineModule,
		SectionModules
	],
	providers: [
		APP_ROUTING_PROVIDERS,
		{ provide: LocationStrategy, useClass: PathLocationStrategy },
	],
	entryComponents: [AppComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
