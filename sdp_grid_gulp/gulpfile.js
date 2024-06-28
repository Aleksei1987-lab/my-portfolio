
const { src, parallel, dest, series, watch } = require('gulp');
const del = require('del');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const sourcemaps =require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const htmlMin = require('gulp-htmlmin');
const svgSprite = require('gulp-svg-sprite');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;

const concat = require('gulp-concat');
const image = require('gulp-image');
const babel = require('gulp-babel');

const clean = () => {
  return del(['app'])
}

const fonts = () => {
  src('./src/fonts/**.ttf')
    .pipe(ttf2woff())
    .pipe(dest('./app/fonts/'))
  return src('./src/fonts/**.ttf')
  .pipe(ttf2woff2())
  .pipe(dest('./app/fonts/'))
}

const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCss({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream())
}

const htmlInclude = () => {
  return src(['./src/**.html'])
    .pipe(fileInclude({
      prefix:'@',
      basepath: '@file'
    }))
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest('./app'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('./src/img/icons/**/*.svg')
        .pipe(svgSprite({
          mode: {
            stack: {
              sprite: '../sprite.svg'
            }
          }
        }))
        .pipe(dest('./app/img'))
        .pipe(browserSync.stream())
}

const imgToApp = () => {
  return src(['./src/img/**/*.jpg', './src/img/**/*.jpeg', './src/img/**/*.png', './src/img/**/*.svg'])
    .pipe(dest('./app/img'))
    .pipe(browserSync.stream())
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('./app/resources'))
}

const scripts = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end');
		})

		.pipe(sourcemaps.init())
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/js'))
		.pipe(browserSync.stream());
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  })

  watch('src/fonts/**.ttf', fonts);
  watch('./src/**/*.html', htmlInclude);
  watch('./src/scss/**/*.scss', styles);
  watch('./src/img/**/*.jpg', imgToApp);
  watch('./src/img/**/*.jpeg', imgToApp);
  watch('./src/img/**/*.png', imgToApp);
  watch('./src/img/**/*.svg', imgToApp);
  watch('./src/img/icons/svg/**/*.svg', svgSprites);
  watch('./src/js/**/*.js', scripts);
  watch('./src/resources/**', resources);
}



const build = series(clean, resources, imgToApp, svgSprites);

exports.clean = clean;
exports.default = series(clean, parallel(fonts, htmlInclude, scripts, imgToApp, svgSprites, resources), styles, watchFiles);
