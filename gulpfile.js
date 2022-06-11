const {src, dest} = require('gulp');
const through2 = require('through2');

const AmpOptimizer = require('@ampproject/toolbox-optimizer');
const ampOptimizer = AmpOptimizer.create({
  verbose: true,
  minify: false
});

function optimizeAmp(cb) {
  return src('public/**/*.html')
    .pipe(
      through2.obj(async (file, _, cb) => {
        if (file.isBuffer()) {
          try {
            const optimizedHtml = await ampOptimizer.transformHtml(file.contents.toString());
            file.contents = Buffer.from(optimizedHtml);
          } catch (error) {
            console.error(error);
          }
        }
        cb(null, file);
      })
    )
    .pipe(dest('public/'));
}

exports.default = optimizeAmp;