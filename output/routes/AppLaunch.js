var Formidable, Pagelet, Q, api, fileTransfer, fs, mkdirp, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

fileTransfer = require('../libs/FileTransfer');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

Formidable = require('formidable');

request = require('request');

Q = require('q');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.updateImage = function(req, res) {
  var form, token;
  token = req.cookies['XPUSS'];
  form = new Formidable.IncomingForm({});
  form.uploadDir = "./__temp_upload__";
  form.multiples = true;
  form.keepExtensions = true;
  return form.parse(req, function(err, fields, files) {
    var fileForm, options, reqObject;
    options = api.getURIComponent({
      method: 'post',
      pathname: '/admin/image/upload',
      timeout: 30 * 1000,
      headers: {
        'Cookie': "token=" + token
      }
    });
    reqObject = request(options, function(err, resp, body) {
      var data, e;
      if (err) {
        return res.send({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['NODE_TIMEOUT'],
          msg: err['message']
        });
      }
      if (resp.statusCode > 400) {
        return res.send({
          data: null,
          node_code: _CONST_NODE_ERROR_CODE_['REMOTE_SERVER_ERR'],
          msg: body
        });
      }
      try {
        data = JSON.parse(body);
      } catch (_error) {
        e = _error;
        return res.send({
          data: data,
          node_code: _CONST_NODE_ERROR_CODE_['PARSE_ERR'],
          msg: body
        });
      }
      res.send({
        data: data,
        msg: 'ok',
        node_code: data['code'],
        msg: data['msg']
      });
      if (fields['__no_retain__']) {
        return fs.unlinik(files.file['path']);
      }
    });
    fileForm = reqObject.form();
    return fileForm.append('files', fs.createReadStream(files.file['path']));
  });
};

exports.list = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 10;
  pagelet = new Pagelet(res, {
    template: 'pagelet/applaunch/list.html',
    request: {
      pathname: '/admin/page/list',
      headers: {
        'Cookie': "token=" + token
      }
    },
    format: function(rs) {
      var pageData;
      pageData = rs['data']['resp']['startPages'];
      return {
        list: pageData['list'],
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/applaunch/list'
        })
      };
    }
  });
  return pagelet.pipe();
};

exports.publish = function(req, res) {
  var pagelet;
  pagelet = new Pagelet(res, {
    template: 'pagelet/applaunch/publish.html',
    data: {
      node_code: _CONST_REMOTE_STATUS_CODE_['SUCCESS']
    },
    format: function(rs) {
      return {};
    }
  });
  return pagelet.pipe();
};

exports.create = function(req, res) {
  var token;
  token = req.cookies['XPUSS'];
  return fileTransfer(req).done(function(arr) {
    var imageID, imageKey, imageUrl, rs, textFields;
    rs = arr[0];
    textFields = arr[1];
    imageKey = rs['data']['resp']['images'][0]['cacheKey'];
    imageUrl = rs['data']['resp']['images'][0]['url'];
    imageID = rs['data']['resp']['images'][0]['id'];
    textFields['imageKey'] = imageKey;
    textFields['surfaceImg'] = imageUrl;
    textFields['headUrl'] = imageID;
    return api.request({
      method: 'post',
      pathname: '/admin/page/add',
      headers: {
        'Cookie': "token=" + token
      },
      body: textFields
    }).done(function(rs) {
      return res.send(rs);
    });
  });
};
