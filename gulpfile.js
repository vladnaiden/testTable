var gulp = require("gulp"),
	connect = require("gulp-connect"),
	less = require("gulp-less"),
	plumber = require("gulp-plumber"),
	minCss = require('gulp-minify-css'),
	minJs = require('gulp-minify'),
	minHtml = require('gulp-minify-html'),
	concat = require('gulp-concat'),
	concatVendor = require('gulp-concat-vendor'),
	uglify = require('gulp-uglify'),
	clean = require('gulp-clean'),
	rename = require('gulp-rename'),
	annotate = require('gulp-ng-annotate');

gulp.task('connect', function(){
	return connect.server({
		base:'http://localhost',
		port:'9000',
		root:['./src/pub/app','./src/pub/app/views' ],
		livereload:true
	});
});

gulp.task('vendorJs', function(){
	return gulp.src([
			'./node_modules/jquery/dist/jquery.js', 
			'./node_modules/angular/angular.js', 
			'./node_modules/angular-route/angular-route.js', 
			'./node_modules/angular-resource/angular-resource.js', 
			'./node_modules/angular-sanitize/angular-sanitize.js',
			'./node_modules/bootstrap/dist/js/bootstrap.js'
		])
		.pipe(uglify())
		.pipe(gulp.dest('./src/pub/app/views/js/temp'))
		.pipe(concatVendor('vendor.js'))
		.pipe(gulp.dest('./src/pub/app/views/js'))
});

gulp.task('appJs', function(){
	return gulp.src([
			'./src/pub/app/services/*.js',
			'./src/pub/app/directives/*.js',
			'./src/pub/app/controllers/*.js',
			'./src/pub/app/*.js'
		 ])
		.pipe(concat('app.js'))
		.pipe(annotate())
		.pipe(gulp.dest('./src/pub/app/views/js'))
		.pipe(uglify())
		.pipe(gulp.dest('./src/pub/app/views/js'))
});

gulp.task('vendorCss', function(){
	return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css'])
		.pipe(plumber())
		.pipe(concat('vendor.css'))
		.pipe(minCss())
		.pipe(gulp.dest('./src/pub/app/views/css'))

});

gulp.task('appCss', function() {
	return gulp.src(['./src/dev/css/style.css'])
		.pipe(plumber())
		.pipe(concat('app.css'))
		.pipe(minCss())
		.pipe(gulp.dest('./src/pub/app/views/css'))
		.pipe(connect.reload())
});

gulp.task('less',['appCss'], function() {
	return gulp.src("./src/dev/css/style.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest("./src/dev/css"))
		.pipe(connect.reload())
});

gulp.task('html', function () {
 	return gulp.src([
	  	'./src/pub/app/*.html',
	  	'./src/pub/app/*.js', 
	  	'./src/pub/app/services/*.js',
	  	'./src/pub/app/controllers/*.js',
	  	'./src/pub/app/directives/*.js',
	  	'./src/pub/app/views/js/*.js'
  	])
	    .pipe(connect.reload())
});

gulp.task('watch', function() {
	return gulp.watch('./src/dev/css/*.less', ['less']),
		gulp.watch('./src/pub/app/*.html', ['html']),
		gulp.watch('./src/dev/css/*.css', ['appCss']),
		gulp.watch('./src/pub/app/directives/*.js', ['html']),
		gulp.watch('./src/pub/app/controllers/*.js', ['html']),
		gulp.watch('./src/pub/app/services/*.js', ['html']),
		gulp.watch('./src/pub/app/*.js', ['html']),
		gulp.watch('./src/pub/app/views/js/*.js', ['html'])
		
});

gulp.task('default', ['watch', 'less', 'connect', 'vendorCss', 'appCss', 'vendorJs', 'appJs', 'html']);


