import gulp from 'gulp';

export function getAAStyles() {
	return gulp.src('./node_modules/aa-assets/src/styles/{elements,generic,objects,settings,themes,tools,trumps}/*.scss')
		.pipe(gulp.dest('./src/styles'));
}

export function getMojsDeclarations() {
	return gulp.src('./node_modules/mojs-typescript-declaration/**/*.d.ts')
		.pipe(gulp.dest('./src/typings/vendors/mojs'));
}
