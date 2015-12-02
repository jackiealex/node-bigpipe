var Formidable, ModelAccess, Pagelet, Q, api, fileTransfer, fs, mkdirp, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

fileTransfer = require('../libs/FileTransfer');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

request = require('request');

Formidable = require('formidable');

Q = require('q');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/coupon/list',
    format: function(rs) {
      var list, pageData;
      pageData = list = rs.data['resp']['page'];
      list = rs.data['resp']['page']['list'];
      return {
        list: list,
        page: utils.pageMaker({
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: 'coupon',
          query: {
            page: page,
            limit: limit
          }
        })
      };
    },
    request: {
      pathname: 'coupon',
      headers: {
        'X-Auth-Token': token
      },
      query: {
        page: page,
        limit: limit
      }
    }
  });
  return pagelet.pipe();
};

exports.publish = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/coupon/publish'
  });
  return pagelet.pipe();
};
