var gulp = require('gulp');
const del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json');

const browserSync = require('browser-sync');
var config = require('./gulp.config')();

const reload = browserSync.reload;

var tslint = require('gulp-tslint');
gulp.task('ts-lint', function(){
	return gulp.src(config.allTs)
			.pipe(tslint())
			.pipe(tslint.report('prose', {emitError: false}));
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
  //return del([config.outPutDir + '/**/*', '!'+config.outPutDir+'/WEB-INF/','!'+config.outPutDir+'/WEB-INF/**' ]);
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['app/**/*', 'index.html', 'styles.css', '!app/**/*.ts'], { base : './' })
    .pipe(gulp.dest(config.outPutDir))
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js',
      'node_modules/node-uuid/uuid.js',
      'node_modules/immutable/dist/immutable.js',
	  'node_modules/angular2/bundles/http.dev.js',
	  'node_modules/angular2-jwt/angular2-jwt.js'
    ])
    .pipe(gulp.dest(config.outPutDir + '/lib'))
});

gulp.task('compile-ts', ['clean'], function(){
	var sourceTsFiles = [
		config.allTs,
		config.typings,
		config.excludeMain,
		config.excludeMain2
	];
	
	console.log(sourceTsFiles);
	
	var tsResult = gulp
					.src(sourceTsFiles)
					.pipe(sourcemaps.init())
					.pipe(tsc(tsProject));
		
	return tsResult.js
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.tsOutputPath));
});



// Run browsersync for development
gulp.task('serve', ['build'], function() {
  browserSync({
    server: {
      baseDir: config.outPutDir
    }
  });

  gulp.watch(['app/**/*', 'index.html', 'styles.css'], ['buildAndReload']);
});

gulp.task('deploy', ['build'], function() {
  gulp.watch(['app/**/*', 'index.html', 'styles.css'], ['deployAndReload']);
});

gulp.task('build', ['ts-lint', 'compile-ts', 'copy:libs', 'copy:assets']);
gulp.task('buildAndReload', ['build'], reload);
gulp.task('deployAndReload', ['build']);
gulp.task('default', ['build']);