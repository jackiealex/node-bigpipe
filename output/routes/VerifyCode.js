var ModelAccess, Pagelet, URL, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

URL = require('url');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var pagelet, phone, token, type;
  token = req.cookies['XPUSS'];
  phone = req.query['phone'];
  type = req.query['type'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/verifycode/index.html'
  });
  return pagelet.pipe();
};
