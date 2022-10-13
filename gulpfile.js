// Dependencias generales
const { src, dest, watch, series, parallel } = require ('gulp'); // Cuando tenga {} significa que manda a llamar varias funciones

// CSS y SASS
const sass = require ('gulp-sass')(require('sass'));
const postcss = require ( 'gulp-postcss' );
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require ('cssnano');

// Imagenes
const imagemin = require ('gulp-imagemin');
const webp = require ( 'gulp-webp');
const avif = require ('gulp-avif');

/* Tareas */
// CSS y SASS
function css ( done ) {
    // Compilar SASS
    src('src/scss/app.scss') // Identifica el archivo sass
        .pipe ( sass() ) // Compila el archivo
        .pipe ( sourcemaps.init() )
        .pipe ( postcss( [ autoprefixer(), cssnano() ] ) )
        .pipe ( sourcemaps.write('.') )
        .pipe ( dest('build/css') ) // Lo guarda en la carpeta build

    done();
}
// Imagenes
function versionWebp () {
    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe ( webp( opciones ) )
        .pipe ( dest('build/img'))
}

function versionAvif () {
    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{png,jpg}')
        .pipe ( avif( opciones ) )
        .pipe ( dest('build/img'))
}

function imagenes ( done ) {
    src('src/img/**/*')
        .pipe( imagemin( {optimizationLevel: 3}) )
        .pipe( dest('build/img'));

    done();
}
// Desarrollo
function dev () {
    watch( 'src/scss/**/*.scss', css);
    watch( 'src/img/**/*', imagenes);

}

/* Exports */

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev );










/* Glosario

src: Busca los archivos de sass
dest: Guarda el archivo compilado en la carpeta destino

watch: Espera por cambios en los archivos seleccionados
watch toma dos parametros dentro del parentesis, ( 'El src del archivo a vigilar', la tarea que manda a ejecutar)

{ outputStyle: 'compressed'}: Se usa para minificar el archivo css cuando se compila

postcss: Sirve para hacer compatible el codigo de sass de ultima generacion con navegadores mas antiguos

series: se utiliza para correr tareas en serie, en el orden en el que son declaradas

parallel: corre las tareas en paralelo


*/