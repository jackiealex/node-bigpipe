require 'colors'

mkdirp = require('mkdirp')
_ = require('lodash')
glob = require('glob')
renderer = require('./libs/renderer')
Q = require('q')
coffee = require('coffee-script')
path = require('path')
cheerio = require('cheerio')
FN = require('evertpl-fn')
Glob = Q.denodeify(glob)
os = require('./libs/os')
fs = require('graceful-fs-extra')
fse = require('fs-extra')
uglifyjs = require("uglify-js")
cssmin = require("cssmin")
config = require('./config')
requirejs = require('requirejs')
output = './output'
madge = require('madge')

argv = require('optimist').argv

fisWorkDir = './__fis_work__'
requirejsConfig = "./static/js/boot/config.js"
fisOutput = './' + + new Date
fisConf = './fis-conf.js'
md5_map_file = 'md5_map.json'

everTplCache = './__cache__'

mapResource = (src, dist) ->

	def = Q.defer()
	res = require "./" + src
	
	map = {}

	cdn = (argv['mode'] || 'pro') + '_static_CDN'

	# console.log cdn, 'fuck', JSON.stringify(config)
	for k, v of res['res']
		map[k] = v['uri'].replace(config[cdn], '')
	fse.outputJson dist, map, (err) ->
		def.resolve(err)
	def.promise

getModulePathByRequireConfig = (mod)->
	source = fse.readFileSync(requirejsConfig)
	fn = new Function("""
			var requirejs, require;
			requirejs = require = {
				config: function(obj) {
					return obj;
				}
			}; 
			return #{source}
		""")
	configObject = fn()
	# add baseDir
	# replace alias
	pathAlias = configObject['paths'] || {}
	sep = path.sep
	docNames = mod.split(sep);
	fullPath = []
	for name, index in docNames
		if pathAlias.hasOwnProperty name
			fullPath.push pathAlias[name]
		else
			fullPath.push name

	start = fullPath[0]

	fullName = fullPath.join(sep)+".js"

	# console.log fullName.blue
	if start.indexOf(sep) == 0 || start.indexOf('http') == 0
		# console.log fullName.yellow, ' ---- '
		return fullName

	return path.join(configObject.baseUrl or './', fullName)


Copy = (src, dist) ->
	def = Q.defer()

	fse.copy src, dist, (code) ->
		def.notify {
			src
			dist
		}
		def.resolve(code)

	def.promise

staticAnalyzor = {
	findStaticFilesFromViews: (src)->
		def = Q.defer()
		jsArr = []
		cssArr = []
		selector = 'script[src],link[href]'
		GlobAll(src).done (list)->
			_.each list, (file)->
				source = fse.readFileSync(file)
				$ = cheerio.load(source)
				nodes = $(selector)
				nodes.each (index, node) =>
					i = node['attribs']['href'] or node['attribs']['src']
					if /\.js$/.test(i)
						jsArr.push(i)
					else if /\.css$/.test(i)
						cssArr.push(i)
			def.resolve {js: _.unique(jsArr), css: _.unique(cssArr)}
		def.promise
	outputUsedCSS: ()->
		def = Q.defer()
		@findStaticFilesFromViews("#{output}/views/**/*.html").done (rs)->
			def.resolve(_.flatten(rs['css']))
		def.promise
	outputUsedJS: ()->
		def = Q.defer()

		@findStaticFilesFromViews("#{output}/views/**/*.html").done (rs)=>
			jsArrFromTemplate = rs['js']

			dependencyObject = madge "#{output}/static/js", {
				format: 'amd'
				findNestedDependencies: true
			}

			jsArrFromStaticsWithDeps = dependencyObject.tree
			
			usedJSFiles = [].concat(jsArrFromTemplate)

			for file, deps of jsArrFromStaticsWithDeps
				file =  getModulePathByRequireConfig(file)
				usedJSFiles.push(file)
				if deps.length>0
					for f in deps
						f = getModulePathByRequireConfig(f)
						usedJSFiles.push(f)

			def.resolve(_.flatten(usedJSFiles))
		def.promise
}
 
uglifyOne = (file) ->
	def = Q.defer()
	d1 = +new Date
	if fse.existsSync(file)
		fse.readFile file, 'utf8', (err, data)->
			type = path.extname(file)
			str = data
			d1 = + new Date
			if err
				if type is '.js'
					console.log('uglifyjs err'.red, file, err)
				else
					console.log('cssmin err'.red, file, err)
				return def.resolve(false)
			if type is '.js'

				str = uglifyjs(data)

			if type is '.css'
				# str = cssmin(data) no css compress
				console.log 'css min is locked here'

			d2 = + new Date
			console.log(((d2 - d1) + 'ms take compress' + file).yellow)

			fse.writeFile file, str, ()->
				def.resolve(true)
	else
		console.log(file, ' not exists')
		def.resolve(false)
	def.promise

uglifyArray = (arr)->
	def = Q.defer()
	console.log arr.length
	Q.all _.map arr, (file, index)->
			return uglifyOne(path.join(output ,file))
		.done ()->
			def.resolve()
	def.promise

uglifyAll = (dir)->
	def = Q.defer()
	GlobAll(dir).done (list)->
		Q.all _.map list, (file, index)->
			return uglifyOne(file)
		.done ()->
			def.resolve()
	def.promise

GlobAll = () -> # string || array<string>
	patterns = [].concat.apply([], arguments)
	def = Q.defer()
	len = patterns.length
	count = 0
	list = []
	Q.all _.map patterns, (pattern, index) ->
		Glob(pattern)
	.done (rs) ->
		rs = _.flatten(rs)
		def.resolve(rs)
	def.promise
 

_compileCoffee = (src_file, dist_file) ->
	def = Q.defer()
	renderer.compile_coffee src_file, (rs) ->
		mkdirp path.dirname(dist_file), ->
			fs.writeFile dist_file, rs, (err) ->
				def.notify({src: src_file, dist: dist_file})
				def.resolve({src: src_file, dist: dist_file})
	def.promise

_compileSylus = (src_file, dist_file) ->
	def = Q.defer()
	renderer.compile_stylus src_file, (rs) ->
		mkdirp path.dirname(dist_file), ->
			fs.writeFile dist_file, rs, (err) ->
				def.notify({src: src_file, dist: dist_file})
				def.resolve({src: src_file, dist: dist_file})
	def.promise

_doFISCompile = () ->
	
	def = Q.defer()

	fse.copySync("#{output}/views", "#{fisWorkDir}/views")
	fse.copySync("#{output}/static", "#{fisWorkDir}/static")
	fse.copySync("#{output}/config.js", "#{fisWorkDir}/config.js")
	fse.copySync(fisConf, "#{fisWorkDir}/#{fisConf}")
	
	os.spawn 'fis', ['release', '-om', '--dest', fisOutput, '--domains', argv['mode']], {
		cwd: fisWorkDir
	}
	.done (rs) ->
		def.resolve({data: rs, dir: fisOutput})

	def.promise

# 1. stylus compile to css, coffee compile to js
# 2. static, view  and  all other files copy
# 3. fis build
# 4. everTpl compile to fn
# 5. copy compile everTpl __cache__, static to output

class Builder
	constructor: (options) ->
		@options = _.extend {
			copy: [
				'views'
				'libs/pagelet/tmpl',
				'static/**/*.css' 

				'static/**/*.js' 
				'static/img/**/*'
				'static/plugins/**/*'

				'Cakefile'
				'forever.sh'
			]
			coffee: {
				ext: 'js'
				src: ['libs/**/*.coffee', 'model/**/*.coffee', 'routes/**/*.coffee', '*.coffee', 'static/**/*.coffee']
			}
			stylus: {
				ext: 'css'
				src: ['static/**/*.styl']
			}
			postProcess: {
				md5: {
					src: [
						'static'
					]
				}
			}
		}, options
		
		@init()

	init: () ->
		console.log('task start'.yellow)

	cleanDirectory: () ->
		fse.removeSync(output)
		fse.removeSync(fisWorkDir)
		console.log [output, fisWorkDir].join(', '), ' removed'.red

	makeDirectory: ->
		fse.ensureDirSync(output)
		fse.ensureDirSync(fisWorkDir)

		console.log [output, fisWorkDir].join(', '), ' created '.green

	compileTemplate: () ->
		dir = everTplCache

		fse.removeSync(dir)

		def = Q.defer()

		fn = new FN {
			onMessage: (type, msgObj) ->
				process.stdout.write('.')					
				if type is 'finish'
					console.log '\n', msgObj['ignored'].join(','), ' ignored'
			src: path.join(fisWorkDir, fisOutput, "views"),
			selector: '**/*.html',
			dist: dir
		}
		fn.run()

		def.resolve()

		def.promise
	copy: () ->
		targets = _.flatten(@options['copy'])
		_that = @

		def = Q.defer()

		GlobAll(targets).done (files) ->
			Q.all _.map files, (file, index) ->
				Copy file, path.join(output, file)
				.progress () ->
					process.stdout.write('.')
			.done (rs) ->
				def.resolve(rs)
		def.promise

	compileCoffee: () ->
		_that = @

		src = @options['coffee']['src']
		ext = @options['coffee']['ext']

		def = Q.defer()

		GlobAll(src).done (files) ->
			Q.all _.map files, (file, index) ->
				outFile = path.join(output, file)
				outFile = outFile.replace(/coffee$/, ext)
				_compileCoffee(file, outFile).progress (rs) ->
					process.stdout.write '.'
			.done (rs) ->
				def.resolve(rs)
		def.promise

	compileStylus: () ->
		_that = @

		src = @options['stylus']['src']
		ext = @options['stylus']['ext']

		def = Q.defer()

		GlobAll(src).done (files) ->
			Q.all _.map files, (file, index) ->
				outFile = path.join(output, file)
				outFile = outFile.replace(/styl$/, ext)
				_compileSylus(file, outFile).progress (rs) ->
					process.stdout.write '.'
			.done (rs) ->
				def.resolve(rs)

		def.promise

	run: () ->
		_that = @
		@.cleanDirectory()
		@.makeDirectory()

		Q.fcall () ->
 			console.log 'all task'.green
		.then () ->
			console.log("compile coffee(both ui and static files) and stylus to #{output}".yellow)
			Q.all [
				_that.compileCoffee()
				_that.compileStylus()
			]
		.then () ->
			console.log('\n')
			console.log("copy ui and statics(not stylus or coffee) template(views) to #{output}".yellow)
			_that.copy()
		.then () ->
			console.log('\n')
			console.log("js deps analyze".yellow)
			staticAnalyzor.outputUsedJS()
		.then (rs) ->
			console.log('\n')
			console.log("js deps uglify ".yellow)
			uglifyArray(rs)
		.then (rs) ->
			console.log('\n')
			console.log("css deps analyze".yellow)
			staticAnalyzor.outputUsedCSS()
		.then (rs) ->
			console.log('\n')
			console.log("css deps uglify ".yellow)
			uglifyArray(rs)
		.then (rs) ->
			console.log('\n')
			console.log('baidu-fis come '.yellow)
			_doFISCompile()
		.then (rs) ->
			console.log('\n')
			console.log('compile template to javascript function '.yellow)	
			_that.compileTemplate()
		.then () ->
			console.log('\n')
			mapResource(path.join("#{fisWorkDir}", "#{fisOutput}", "map.json"), path.join(output, "static", "js", md5_map_file))
		.then () ->
			fse.copySync(everTplCache, path.join(output, everTplCache))
			fse.copySync("#{fisWorkDir}/#{fisOutput}/static", path.join(output, "static"))
			console.log('\n')
			console.log('all task done successfully '.green)	
		.catch (err)->
			console.log 'fuck error'.red, err

# builder = new Builder
# builder.run()


requirejsOptmize = ()->
	console.log(Date.now())
	requirejs.optimize {
		appDir: './static/js/test'
		baseUrl: './'
		# baseUrl: 'static/js'
		dir: './static/js/test'
		dir : '__optimize__'
		uglify: 'none'
		modules: [
			{name: 'merge/m'}
			{name: 'merge/n'}
		]
	}
	console.log(Date.now())

requirejsOptmize()

 


