var Formidable, Pagelet, Q, api, fileTransfer, fs, mkdirp, qs, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

fileTransfer = require('../libs/FileTransfer');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

qs = require('qs');

request = require('request');

Formidable = require('formidable');

Q = require('q');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.rel = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    template: 'page/category/category.rel.html',
    selector: '#window .win-content',
    format: function(rs) {
      return {
        list: rs['data']['resp']['data']
      };
    },
    request: {
      pathname: 'admin/interestcate/alllist',
      headers: {
        'Cookie': "token=" + token
      }
    }
  });
  return pagelet.pipe();
};

exports.updateImage = function(req, res) {
  return fileTransfer(req).done(function(rs) {
    var imageResult;
    imageResult = rs[0];
    if (imageResult['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
      return res.send(imageObject);
    }
    return res.send(imageResult);
  });
};

exports.list = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/category/list.html',
    format: function(rs) {
      return {
        list: rs['data']['resp']['data']
      };
    },
    request: {
      pathname: 'admin/interestcate/alllist',
      headers: {
        'Cookie': "token=" + token
      }
    }
  });
  return pagelet.pipe();
};

exports.publish = function(req, res) {
  var pagelet, query, token;
  token = req.cookies['XPUSS'];
  query = req.query;
  pagelet = new Pagelet(res, {
    template: 'pagelet/category/publish',
    format: function(rs) {
      return {
        list: rs['data']['resp']['data'],
        pid: query['pid'] || 0
      };
    },
    request: {
      pathname: 'admin/interestcate/alllist',
      headers: {
        'Cookie': "token=" + token
      }
    }
  });
  return pagelet.pipe();
};

exports.create = function(req, res) {
  var token;
  token = req.cookies['XPUSS'];
  return fileTransfer(req).done(function(arr) {
    var imageKey, imageUrl, rs, textFields;
    rs = arr[0];
    if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
      return res.send(imageObject);
    }
    textFields = arr[1];
    imageKey = rs['data']['resp']['images'][0]['cacheKey'];
    imageUrl = rs['data']['resp']['images'][0]['url'];
    textFields['imageKey'] = imageKey;
    textFields['surfaceImg'] = imageUrl;
    return api.request({
      method: 'post',
      pathname: '/admin/interestcate/add',
      headers: {
        'Cookie': "token=" + token
      },
      body: textFields
    }).done(function(rs) {
      return res.send(rs);
    });
  });
};
