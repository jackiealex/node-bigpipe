api = require('../libs/api')
utils = require('../libs/utils')
Pagelet = require('../libs/pagelet')

template = require('evertpl')
Q = require 'q'
fs = require('fs')
mkdirp = require('mkdirp')
_ = require('lodash')

request = require('request')
Formidable = require('formidable')

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_']
_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_']

module.exports =  (req, options = {}) ->

	token = req.cookies['XPUSS']
	form = new Formidable.IncomingForm({})
	
	form.uploadDir = "./__temp_upload__"
	form.multiples = true
	form.keepExtensions = true

	def = Q.defer()

	options = _.extend {
	}, options

	form.parse req, (err, fields, files) ->
		if err
			return def.resolve({code: 'timeout'})
		uploadFileServerPath = fields['upload_file_server_path'] or 'public/upload'
		reqObject = request api.getURIComponent({method: 'post', timeout: 50000, pathname:  uploadFileServerPath, headers: {'X-Auth-Token': token}}), (err, resp, body) ->
			if err
	            def.resolve {data: null, node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'], msg: err['message']}
	            return
	        # check if remote server has the api
	        if resp.statusCode > 400
	            def.resolve {data: null, node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'], msg: body}
	            return
	        try
	            data = JSON.parse body
	        catch e
	            def.resolve {data: null, node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'], msg: body}
	            return
	        def.resolve {data: data, msg: data['msg'], node_code: data['code'], fields: fields}

	        # 文件删除
			for fileField of files
				fs.unlink files['file']['path']

		fileForm = reqObject.form()

		fileForm.append('file', fs.createReadStream(files['file']['path']))

		for key, value of fields
			# console.log key, value
			fileForm.append(key, value)

	def.promise



		