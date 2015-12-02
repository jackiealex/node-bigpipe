var Formidable, Pagelet, Q, api, fs, mkdirp, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

request = require('request');

Formidable = require('formidable');

Q = require('q');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.hello = function(req, res) {
  var pagelet;
  pagelet = new Pagelet(res, {
    template: 'pagelet/test/hello'
  });
  return pagelet.pipe();
};
