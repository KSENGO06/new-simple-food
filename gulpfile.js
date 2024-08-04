const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const rename = require('gulp-rename');


function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    notify: false,
  });
}
gulp.task('copy-swiped-events', function() {
  return gulp.src('node_modules/swiped-events/dist/swiped-events.min.js')
      .pipe(rename('swiped-events.min.js'))
      .pipe(gulp.dest('app/js/vendor'));
});


function svgSprites() {
  return src('app/images/icons/*.svg') 
  .pipe(cheerio({
        run: ($) => {
            $("[fill]").removeAttr("fill"); // очищаем цвет у иконок по умолчанию, чтобы можно было задать свой
            $("[stroke]").removeAttr("stroke"); // очищаем, если есть лишние атрибуты строк
            $("[style]").removeAttr("style"); // убираем внутренние стили для иконок
        },
        parserOptions: { xmlMode: true },
      })
  )
	.pipe(
	      svgSprite({
	        mode: {
	          stack: {
	            sprite: '../sprite.svg', 
	          },
	        },
	      })
	    )
	.pipe(dest('app/images')); 
}
function svgSprites() {
  return src('app/images/icons/*.svg') 
  .pipe(cheerio({
        run: ($) => {
            $("[fill]").removeAttr("fill"); 
            $("[stroke]").removeAttr("stroke"); 
            $("[style]").removeAttr("style"); 
        },
        parserOptions: { xmlMode: true },
      })
  )
	.pipe(replace('&gt;','>')) // боремся с заменой символа 
	.pipe(
	      svgSprite({
	        mode: {
	          stack: {
	            sprite: '../sprite.svg', 
	          },
	        },
	      })
	    )
	.pipe(dest('app/images')); 
}

function svgSprites() {
  return src('app/images/icons/*.svg') // вибираємо всі файли з розширенням svg у папці з іконками
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg', // вказуємо ім'я файлу спрайта та шлях
          },
        },
      })
    )
    .pipe(dest('app/images')); // вказуємо, в яку папку помістити готовий файл спрайта
}

function fileIncludes() {
  return src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('./dist'));
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "expanded" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function images() {
  return src("app/images/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}

function build() {
  return src(["app/**/*.html", "app/css/style.min.css", "app/js/main.min.js"], 
    gulp.task('build', gulp.series('copy-swiped-events', 'styles', 'scripts', 'html')),
    {
    base: "app",
  }).pipe(dest("dist"));
}

function cleanDist() {
  return del("dist");
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
  watch(['app/images/icons/*.svg'], svgSprites);
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/slick-carousel/slick/slick.js",
    "node_modules/mixitup/dist/mixitup.js",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
    "app/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);
exports.svgSprites = svgSprites;
exports.fileIncludes = fileIncludes;

exports.default = parallel(svgSprites, styles, fileIncludes, scripts, browsersync, watching);

