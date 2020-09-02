import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import del from "del";
import browserify from "gulp-browserify";
import babel from "babelify";

sass.compiler = require("node-sass");

const paths = {
    style: {
        src: "src/assets/scss/style.scss",
        dest: "src/static",
        watch: "src/assets/scss/**/*.scss",
    },
    js: {
        src: "src/assets/js/main.js",
        dest: "src/static",
        watch: "src/assets/js/**/*.js",
    },
};

export function style() {
    return gulp //
        .src(paths.style.src)
        .pipe(sass())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 2 versions"],
                cascade: false,
            })
        )
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.style.dest));
}

const js = () =>
    gulp
        .src(paths.js.src)
        .pipe(
            browserify({
                transform: [
                    babel.configure({
                        presets: ["@babel/preset-env"],
                    }),
                ],
            })
        )
        .pipe(gulp.dest(paths.js.dest));

function clean() {
    return del("src/static");
}

function watchFiles() {
    gulp.watch(paths.style.watch, style);
    gulp.watch(paths.js.watch, js);
}

export const dev = gulp.series([clean, style, js, watchFiles]);
export const build = gulp.series([clean, js, style]);
