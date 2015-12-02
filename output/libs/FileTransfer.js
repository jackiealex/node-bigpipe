var Formidable, Pagelet, Q, api, fs, mkdirp, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

Q = require('q');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

request = require('request');

Formidable = require('formidable');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

module.exports = function(req, options) {
  var def, form, token;
  if (options == null) {
    options = {};
  }
  token = req.cookies['XPUSS'];
  form = new Formidable.IncomingForm({});
  form.uploadDir = "./__temp_upload__";
  form.multiples = true;
  form.keepExtensions = true;
  def = Q.defer();
  options = _.extend({}, options);
  form.parse(req, function(err, fields, files) {
    var fileForm, key, reqObject, uploadFileServerPath, value, _results;
    if (err) {
      return def.resolve({
        code: 'timeout'
      });
    }
    uploadFileServerPath = fields['upload_file_server_path'] || 'public/upload';
    reqObject = request(api.getURIComponent({
      method: 'post',
      timeout: 50000,
      pathname: uploadFileServerPath,
      headers: {
        'X-Auth-Token': token
      }
    }), function(err, resp, body) {
      var data, e, fileField, _results;
      if (err) {
        def.resolve({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'],
          msg: err['message']
        });
        return;
      }
      if (resp.statusCode > 400) {
        def.resolve({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'],
          msg: body
        });
        return;
      }
      try {
        data = JSON.parse(body);
      } catch (_error) {
        e = _error;
        def.resolve({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'],
          msg: body
        });
        return;
      }
      def.resolve({
        data: data,
        msg: data['msg'],
        node_code: data['code'],
        fields: fields
      });
      _results = [];
      for (fileField in files) {
        _results.push(fs.unlink(files['file']['path']));
      }
      return _results;
    });
    fileForm = reqObject.form();
    fileForm.append('file', fs.createReadStream(files['file']['path']));
    _results = [];
    for (key in fields) {
      value = fields[key];
      _results.push(fileForm.append(key, value));
    }
    return _results;
  });
  return def.promise;
};
