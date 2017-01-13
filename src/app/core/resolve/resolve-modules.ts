import { PageResolveGuard } from './page-resolve';
import { StageResolveGuard } from './stage-resolve';

export var RESOLVE_MODULES = [
	PageResolveGuard,
	StageResolveGuard
];

