require './global'
_VAR_CONFIG_ = require './config'

AppBaseController = require('./libs/AppBaseController')
Pagelet = require('./libs/pagelet')
 
# routes modules
Test = require('./routes/Test')
WorkFlow = require('./routes/WorkFlow')
 
template = require('evertpl')
fs = require('fs')
bodyParser = require('body-parser')
cookieParser = require('cookie-parser')
session = require('cookie-session')
mkdirp = require('mkdirp')
express = require('express')
_ = require('lodash')

# class definition area
class APP extends AppBaseController
	constructor: (options) ->
		template.config
			src: './views'
			env: 'development'
		super options

#init app instance
app = new APP
	port: _VAR_CONFIG_['dev_port']
	mode: _VAR_CONFIG_['mode'] || 'dev'
	assets: [
		{pattern: '/static', root: './static'}
		{pattern: '/resource', root: './__temp_upload__'}
		{pattern: '/favicon.ico', root: './static/img/icons/logo.png'}
	]

# use middle ware
app.server.disable('x-powered-by')
app.server.set('x-powered-by', 'Phoenix');
app.server.use bodyParser.urlencoded({extended: false})
app.server.use bodyParser.json()
app.server.use(cookieParser())

app.server.use session {
	name: 'NYUSS'
	keys: ['hellokitty']
	# secureProxy: true
	cookie: {maxAge: 24 * 60 * 60 * 1000}
	secret: 'you never get the secret'
}

# add access log
app.server.all '/*', (req, res, next) ->
	startTime = new Date
	console.log(startTime, req.path, ' arrive', 'METHOD', req.method)
	res.on 'finish', (e) ->
		endTime = new Date
		console.log(endTime, req.path, ' depart ', (endTime - startTime) + 'ms RTT')
	next()

app.server.get '/test', Test.resource


app.addPipeRoutes '/', (req, res)->
	 
	pagelet = new Pagelet res, {
		autoEnd: true
		selector: '#main'
		template: 'test/pagelet.demo/what.html'
	}
	pagelet.pipe()

	
app.addPipeRoutes '/test/layout', Test.layout
app.addPipeRoutes '/test/view', Test.view
app.addPipeRoutes '/test/load', Test.load
app.addPipeRoutes '/test/delay1', Test.delay1
app.addPipeRoutes '/test/delay2', Test.delay2
app.addPipeRoutes '/test/tmpl', Test.tmpl

 
# not found or error 
# app.server.use (req, res, next) ->
# 	if req.query['__pipe__']
# 		pagelet = new Pagelet {
# 			template: 'page/sorry/404.html'
# 		}
# 		return pagelet.pipe(res)

# 	html = template.renderFile 'page/sorry/404.html', {}
# 	res.send(html)

# app.server.use (err, req, res, next) ->
# 	console.log err
# 	html = template.renderFile 'page/sorry/5xx.html', {}
# 	res.send(html)

# app start
app.start ->
	console.log @options
	console.log('\n浏览器访问：http://localhost:' + @options.port);
