# sys modules
path = require('path')
# npm modules
_ = require('lodash')
express = require('express')
Gaze = require('gaze')
os = require('./os')
 
config = require('../config')
# self module
renderer = require './renderer'

socket_redis = require('socket.io-redis')

mail = require('./mail')

WorkFlow = require('../routes/WorkFlow')

class AppBaseController
	constructor: (options) ->
		@options = _.extend({
			mode: process.env.NODE_ENV
			port: 8080
			assets: []
		}, options)

		@server = express()
		@_IO_Handlers = []
		# init middleware

		@_init()
		# 一类是后端文件改变，需要通知后台进程重启服务
		# 另一类是前端文件，需要通知客户端浏览器重启服务 在bin.coffee中
	_watch_browser_resource: () ->
		if @options.mode isnt 'development'
			return
			
		target = config['watcher']['browser']['target'] || []
		gaze = new Gaze target, {
			mode: 'poll'
			debounceDelay: 1000
		}

		gaze.on 'all', (action, file_name) =>
			console.log(file_name, ' changed')
			@io.emit('reload', action + file_name)
			
	_init: () ->
		@_init_default_static()
		@_watch_browser_resource()

	addPipeRoutes: (path, handlers...)->
		@server.get path, [WorkFlow].concat(handlers)

	addStatic: (pattern, root) ->
		@_static pattern, root
	_init_default_static: () ->

		assets = @options['assets']
		assets.forEach (item, index) =>
			@addStatic(item['pattern'], item['root'])
	addSocketIOHandler: (handler)->
		@_IO_Handlers.push(handler)
	_static: (pattern, root) ->
		if not pattern
			throw Error('param pattern required!')

		# set static previous filter
		@server.use pattern, express.static(root)
		@server.use pattern, (req, res, next) ->

			delay = req.query.delay || 0
			delay = delay * 1000
			ext = path.extname(req.path)
			file_path_name = req.path

			switch ext
				when '.js'
					ext_from = '.coffee'
					ext_to = '.js'
					content_type = 'application/javascript'
					origin_coffee_file = path.join(root, file_path_name).replace(ext_to, ext_from)

					renderer.compile_coffee origin_coffee_file, (str) ->
						console.log('memory ', origin_coffee_file)
						setTimeout(() ->
							res.send(str)
						, delay)

				when '.css'
					ext_from = '.styl'
					ext_to = '.css'
					content_type = 'text/css'

					res.type(content_type)

					origin_stylus_file = path.join(root, file_path_name).replace(ext_to, ext_from)
					renderer.compile_stylus origin_stylus_file, (str) ->
						console.log('memory ', origin_stylus_file)
						setTimeout(() ->
							res.send(str)
						, delay)

				else
					next('Error file ' + file_path_name + ' not found')
					return
	start: (cb) ->
		cb ?= () ->
		server = (require 'http').Server(@server)
		port = @options['port']
		server.listen port, () =>
			cb.call(@)

module.exports = AppBaseController