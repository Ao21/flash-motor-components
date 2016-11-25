import gulp from 'gulp';
import {
	getAAStyles,
	getMojsDeclarations
} from './tasks/gulp';

gulp.task('mojs', getMojsDeclarations);

export default getAAStyles;