const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const nunjucksRender = require('gulp-nunjucks-render');
const replace = require('gulp-replace');
const rename = require('gulp-rename');


function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },

  });
}

function nunjucks(){
  return src ('app/*.njk')
  .pipe (nunjucksRender())
  .pipe (dest('app'))
  .pipe(browserSync.stream())

}


function copySwipedEvents() {
  return src('node_modules/swiped-events/dist/swiped-events.min.js')
      .pipe(rename('swiped-events.min.js'))
      .pipe(dest('app/js/vendor'));
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
      }))
      .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      }))
      .pipe(dest('app/images'));
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


function copyStyles() {
  return src('node_modules/nouislider/dist/nouislider.css')
    .pipe(dest('app/css/vendor'));
}

function scripts() {
  return src([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/slick-carousel/slick/slick.js",
    "node_modules/mixitup/dist/mixitup.js",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
    "node_modules/ion-rangeslider/js/ion.rangeSlider.js",
    "node_modules/jquery-form-styler/dist/jquery.formstyler.js",
    "node_modules/rateyo/lib/iife/rateyo.min.js",
    "app/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}
function cleanDist() {
  return del("dist");
}

function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/*.njk"],nunjucks);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/**/*.html"]).on("change", browserSync.reload);
  watch(['app/images/icons/*.svg'], svgSprites);
}
function build() {
  return src(["app/**/*.html", "app/css/style.min.css", "app/js/main.min.js"], {
    base: "app",
  }).pipe(dest("dist"));
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);
exports.svgSprites = svgSprites;
exports.nunjucks = nunjucks;
exports.fileIncludes = fileIncludes;
exports.copyStyles = copyStyles;

exports.default = parallel(nunjucks, copySwipedEvents, styles, fileIncludes, scripts, browsersync, watching);


