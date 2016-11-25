import { NgModule, ModuleWithProviders } from '@angular/core';
import { RtlModule } from './rtl/dir';
import { PortalModule } from './portal/portal-directives';
import { OverlayModule } from './overlay/overlay-directives';
import { OVERLAY_PROVIDERS } from './overlay/overlay';

// RTL
export { Dir, LayoutDirection, RtlModule } from './rtl/dir';

// Portals
export {
	Portal,
	PortalHost,
	BasePortalHost,
	ComponentPortal,
	TemplatePortal
} from './portal/portal';
export {
	PortalHostDirective,
	TemplatePortalDirective,
	PortalModule,
} from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';


// Overlay
export { Overlay, OVERLAY_PROVIDERS } from './overlay/overlay';
export { OverlayContainer } from './overlay/overlay-container';
export { OverlayRef } from './overlay/overlay-ref';
export { OverlayState } from './overlay/overlay-state';
export {
	ConnectedOverlayDirective,
	OverlayOrigin,
	OverlayModule,
} from './overlay/overlay-directives';
export * from './overlay/position/connected-position-strategy';
export * from './overlay/position/connected-position';

// Style
export { applyCssTransform } from './style/apply-transform';

// Coersion
export { coerceBooleanProperty } from './coersion/boolean-property';
export { coerceNumberProperty } from './coersion/number-property';

// Gestures
export {GestureConfig} from './gestures/gesture-config';

// Coordination
export { UniqueSelectionDispatcher } from './coordination/unique-selection-dispatcher';

@NgModule({
	imports: [RtlModule, PortalModule, OverlayModule],
	exports: [RtlModule, PortalModule, OverlayModule],
})
export class MdCoreModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: MdCoreModule,
			providers: [OVERLAY_PROVIDERS],
		};
	}
}
