var Builder, Copy, FN, Glob, GlobAll, Q, argv, builder, cheerio, coffee, config, cssmin, everTplCache, fisConf, fisOutput, fisWorkDir, fs, fse, getModulePathByRequireConfig, glob, madge, mapResource, md5_map_file, mkdirp, os, output, path, renderer, requirejs, requirejsConfig, staticAnalyzor, uglifyAll, uglifyArray, uglifyOne, uglifyjs, _, _compileCoffee, _compileSylus, _doFISCompile;

require('colors');

mkdirp = require('mkdirp');

_ = require('lodash');

glob = require('glob');

renderer = require('./libs/renderer');

Q = require('q');

coffee = require('coffee-script');

path = require('path');

cheerio = require('cheerio');

FN = require('evertpl-fn');

Glob = Q.denodeify(glob);

os = require('./libs/os');

fs = require('graceful-fs-extra');

fse = require('fs-extra');

uglifyjs = require("uglify-js");

cssmin = require("cssmin");

config = require('./config');

requirejs = require('requirejs');

output = './output';

madge = require('madge');

argv = require('optimist').argv;

fisWorkDir = './__fis_work__';

requirejsConfig = "./static/js/boot/config.js";

fisOutput = './' + +(new Date);

fisConf = './fis-conf.js';

md5_map_file = 'md5_map.json';

everTplCache = './__cache__';

mapResource = function(src, dist) {
  var cdn, def, k, map, res, v, _ref;
  def = Q.defer();
  res = require("./" + src);
  map = {};
  cdn = (argv['mode'] || 'pro') + '_static_CDN';
  _ref = res['res'];
  for (k in _ref) {
    v = _ref[k];
    map[k] = v['uri'].replace(config[cdn], '');
  }
  fse.outputJson(dist, map, function(err) {
    return def.resolve(err);
  });
  return def.promise;
};

getModulePathByRequireConfig = function(mod) {
  var configObject, docNames, fn, fullName, fullPath, index, name, pathAlias, sep, source, start, _i, _len;
  source = fse.readFileSync(requirejsConfig);
  fn = new Function("var requirejs, require;\nrequirejs = require = {\n	config: function(obj) {\n		return obj;\n	}\n}; \nreturn " + source);
  configObject = fn();
  pathAlias = configObject['paths'] || {};
  sep = path.sep;
  docNames = mod.split(sep);
  fullPath = [];
  for (index = _i = 0, _len = docNames.length; _i < _len; index = ++_i) {
    name = docNames[index];
    if (pathAlias.hasOwnProperty(name)) {
      fullPath.push(pathAlias[name]);
    } else {
      fullPath.push(name);
    }
  }
  start = fullPath[0];
  fullName = fullPath.join(sep) + ".js";
  if (start.indexOf(sep) === 0 || start.indexOf('http') === 0) {
    return fullName;
  }
  return path.join(configObject.baseUrl || './', fullName);
};

Copy = function(src, dist) {
  var def;
  def = Q.defer();
  fse.copy(src, dist, function(code) {
    def.notify({
      src: src,
      dist: dist
    });
    return def.resolve(code);
  });
  return def.promise;
};

staticAnalyzor = {
  findStaticFilesFromViews: function(src) {
    var cssArr, def, jsArr, selector;
    def = Q.defer();
    jsArr = [];
    cssArr = [];
    selector = 'script[src],link[href]';
    GlobAll(src).done(function(list) {
      _.each(list, function(file) {
        var $, nodes, source;
        source = fse.readFileSync(file);
        $ = cheerio.load(source);
        nodes = $(selector);
        return nodes.each((function(_this) {
          return function(index, node) {
            var i;
            i = node['attribs']['href'] || node['attribs']['src'];
            if (/\.js$/.test(i)) {
              return jsArr.push(i);
            } else if (/\.css$/.test(i)) {
              return cssArr.push(i);
            }
          };
        })(this));
      });
      return def.resolve({
        js: _.unique(jsArr),
        css: _.unique(cssArr)
      });
    });
    return def.promise;
  },
  outputUsedCSS: function() {
    var def;
    def = Q.defer();
    this.findStaticFilesFromViews("" + output + "/views/**/*.html").done(function(rs) {
      return def.resolve(_.flatten(rs['css']));
    });
    return def.promise;
  },
  outputUsedJS: function() {
    var def;
    def = Q.defer();
    this.findStaticFilesFromViews("" + output + "/views/**/*.html").done((function(_this) {
      return function(rs) {
        var dependencyObject, deps, f, file, jsArrFromStaticsWithDeps, jsArrFromTemplate, usedJSFiles, _i, _len;
        jsArrFromTemplate = rs['js'];
        dependencyObject = madge("" + output + "/static/js", {
          format: 'amd',
          findNestedDependencies: true
        });
        jsArrFromStaticsWithDeps = dependencyObject.tree;
        usedJSFiles = [].concat(jsArrFromTemplate);
        for (file in jsArrFromStaticsWithDeps) {
          deps = jsArrFromStaticsWithDeps[file];
          file = getModulePathByRequireConfig(file);
          usedJSFiles.push(file);
          if (deps.length > 0) {
            for (_i = 0, _len = deps.length; _i < _len; _i++) {
              f = deps[_i];
              f = getModulePathByRequireConfig(f);
              usedJSFiles.push(f);
            }
          }
        }
        return def.resolve(_.flatten(usedJSFiles));
      };
    })(this));
    return def.promise;
  }
};

uglifyOne = function(file) {
  var d1, def;
  def = Q.defer();
  d1 = +(new Date);
  if (fse.existsSync(file)) {
    fse.readFile(file, 'utf8', function(err, data) {
      var d2, str, type;
      type = path.extname(file);
      str = data;
      d1 = +(new Date);
      if (err) {
        if (type === '.js') {
          console.log('uglifyjs err'.red, file, err);
        } else {
          console.log('cssmin err'.red, file, err);
        }
        return def.resolve(false);
      }
      if (type === '.js') {
        str = uglifyjs(data);
      }
      if (type === '.css') {
        console.log('css min is locked here');
      }
      d2 = +(new Date);
      console.log(((d2 - d1) + 'ms take compress' + file).yellow);
      return fse.writeFile(file, str, function() {
        return def.resolve(true);
      });
    });
  } else {
    console.log(file, ' not exists');
    def.resolve(false);
  }
  return def.promise;
};

uglifyArray = function(arr) {
  var def;
  def = Q.defer();
  console.log(arr.length);
  Q.all(_.map(arr, function(file, index) {
    return uglifyOne(path.join(output, file));
  })).done(function() {
    return def.resolve();
  });
  return def.promise;
};

uglifyAll = function(dir) {
  var def;
  def = Q.defer();
  GlobAll(dir).done(function(list) {
    return Q.all(_.map(list, function(file, index) {
      return uglifyOne(file);
    })).done(function() {
      return def.resolve();
    });
  });
  return def.promise;
};

GlobAll = function() {
  var count, def, len, list, patterns;
  patterns = [].concat.apply([], arguments);
  def = Q.defer();
  len = patterns.length;
  count = 0;
  list = [];
  Q.all(_.map(patterns, function(pattern, index) {
    return Glob(pattern);
  })).done(function(rs) {
    rs = _.flatten(rs);
    return def.resolve(rs);
  });
  return def.promise;
};

_compileCoffee = function(src_file, dist_file) {
  var def;
  def = Q.defer();
  renderer.compile_coffee(src_file, function(rs) {
    return mkdirp(path.dirname(dist_file), function() {
      return fs.writeFile(dist_file, rs, function(err) {
        def.notify({
          src: src_file,
          dist: dist_file
        });
        return def.resolve({
          src: src_file,
          dist: dist_file
        });
      });
    });
  });
  return def.promise;
};

_compileSylus = function(src_file, dist_file) {
  var def;
  def = Q.defer();
  renderer.compile_stylus(src_file, function(rs) {
    return mkdirp(path.dirname(dist_file), function() {
      return fs.writeFile(dist_file, rs, function(err) {
        def.notify({
          src: src_file,
          dist: dist_file
        });
        return def.resolve({
          src: src_file,
          dist: dist_file
        });
      });
    });
  });
  return def.promise;
};

_doFISCompile = function() {
  var def;
  def = Q.defer();
  fse.copySync("" + output + "/views", "" + fisWorkDir + "/views");
  fse.copySync("" + output + "/static", "" + fisWorkDir + "/static");
  fse.copySync("" + output + "/config.js", "" + fisWorkDir + "/config.js");
  fse.copySync(fisConf, "" + fisWorkDir + "/" + fisConf);
  os.spawn('fis', ['release', '-om', '--dest', fisOutput, '--domains', argv['mode']], {
    cwd: fisWorkDir
  }).done(function(rs) {
    return def.resolve({
      data: rs,
      dir: fisOutput
    });
  });
  return def.promise;
};

Builder = (function() {
  function Builder(options) {
    this.options = _.extend({
      copy: ['views', 'libs/pagelet/tmpl', 'static/**/*.css', 'static/**/*.js', 'static/img/**/*', 'static/plugins/**/*', 'Cakefile', 'forever.sh'],
      coffee: {
        ext: 'js',
        src: ['libs/**/*.coffee', 'model/**/*.coffee', 'routes/**/*.coffee', '*.coffee', 'static/**/*.coffee']
      },
      stylus: {
        ext: 'css',
        src: ['static/**/*.styl']
      },
      postProcess: {
        md5: {
          src: ['static']
        }
      }
    }, options);
    this.init();
  }

  Builder.prototype.init = function() {
    return console.log('task start'.yellow);
  };

  Builder.prototype.cleanDirectory = function() {
    fse.removeSync(output);
    fse.removeSync(fisWorkDir);
    return console.log([output, fisWorkDir].join(', '), ' removed'.red);
  };

  Builder.prototype.makeDirectory = function() {
    fse.ensureDirSync(output);
    fse.ensureDirSync(fisWorkDir);
    return console.log([output, fisWorkDir].join(', '), ' created '.green);
  };

  Builder.prototype.compileTemplate = function() {
    var def, dir, fn;
    dir = everTplCache;
    fse.removeSync(dir);
    def = Q.defer();
    fn = new FN({
      onMessage: function(type, msgObj) {
        process.stdout.write('.');
        if (type === 'finish') {
          return console.log('\n', msgObj['ignored'].join(','), ' ignored');
        }
      },
      src: path.join(fisWorkDir, fisOutput, "views"),
      selector: '**/*.html',
      dist: dir
    });
    fn.run();
    def.resolve();
    return def.promise;
  };

  Builder.prototype.copy = function() {
    var def, targets, _that;
    targets = _.flatten(this.options['copy']);
    _that = this;
    def = Q.defer();
    GlobAll(targets).done(function(files) {
      return Q.all(_.map(files, function(file, index) {
        return Copy(file, path.join(output, file)).progress(function() {
          return process.stdout.write('.');
        });
      })).done(function(rs) {
        return def.resolve(rs);
      });
    });
    return def.promise;
  };

  Builder.prototype.compileCoffee = function() {
    var def, ext, src, _that;
    _that = this;
    src = this.options['coffee']['src'];
    ext = this.options['coffee']['ext'];
    def = Q.defer();
    GlobAll(src).done(function(files) {
      return Q.all(_.map(files, function(file, index) {
        var outFile;
        outFile = path.join(output, file);
        outFile = outFile.replace(/coffee$/, ext);
        return _compileCoffee(file, outFile).progress(function(rs) {
          return process.stdout.write('.');
        });
      })).done(function(rs) {
        return def.resolve(rs);
      });
    });
    return def.promise;
  };

  Builder.prototype.compileStylus = function() {
    var def, ext, src, _that;
    _that = this;
    src = this.options['stylus']['src'];
    ext = this.options['stylus']['ext'];
    def = Q.defer();
    GlobAll(src).done(function(files) {
      return Q.all(_.map(files, function(file, index) {
        var outFile;
        outFile = path.join(output, file);
        outFile = outFile.replace(/styl$/, ext);
        return _compileSylus(file, outFile).progress(function(rs) {
          return process.stdout.write('.');
        });
      })).done(function(rs) {
        return def.resolve(rs);
      });
    });
    return def.promise;
  };

  Builder.prototype.run = function() {
    var _that;
    _that = this;
    this.cleanDirectory();
    this.makeDirectory();
    return Q.fcall(function() {
      return console.log('all task'.green);
    }).then(function() {
      console.log(("compile coffee(both ui and static files) and stylus to " + output).yellow);
      return Q.all([_that.compileCoffee(), _that.compileStylus()]);
    }).then(function() {
      console.log('\n');
      console.log(("copy ui and statics(not stylus or coffee) template(views) to " + output).yellow);
      return _that.copy();
    }).then(function() {
      console.log('\n');
      console.log("js deps analyze".yellow);
      return staticAnalyzor.outputUsedJS();
    }).then(function(rs) {
      console.log('\n');
      console.log("js deps uglify ".yellow);
      return uglifyArray(rs);
    }).then(function(rs) {
      console.log('\n');
      console.log("css deps analyze".yellow);
      return staticAnalyzor.outputUsedCSS();
    }).then(function(rs) {
      console.log('\n');
      console.log("css deps uglify ".yellow);
      return uglifyArray(rs);
    }).then(function(rs) {
      console.log('\n');
      console.log('baidu-fis come '.yellow);
      return _doFISCompile();
    }).then(function(rs) {
      console.log('\n');
      console.log('compile template to javascript function '.yellow);
      return _that.compileTemplate();
    }).then(function() {
      console.log('\n');
      return mapResource(path.join("" + fisWorkDir, "" + fisOutput, "map.json"), path.join(output, "static", "js", md5_map_file));
    }).then(function() {
      fse.copySync(everTplCache, path.join(output, everTplCache));
      fse.copySync("" + fisWorkDir + "/" + fisOutput + "/static", path.join(output, "static"));
      console.log('\n');
      return console.log('all task done successfully '.green);
    })["catch"](function(err) {
      return console.log('fuck error'.red, err);
    });
  };

  return Builder;

})();

builder = new Builder;

builder.run();
