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

exports.dnu = function(req, res) {
  var pagelet, query, type;
  query = req.query;
  type = query['type'] || 'newuser';
  pagelet = new Pagelet(res, {
    template: 'pagelet/statistics/dnu.html',
    data: {
      type: type
    }
  });
  return pagelet.pipe();
};
