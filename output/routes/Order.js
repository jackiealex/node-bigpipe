var Formidable, Pagelet, Q, api, fileTransfer, fs, mkdirp, qs, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

fileTransfer = require('../libs/FileTransfer');

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

exports.list = function(req, res) {
  var key, limit, page, pagelet, query, status, token;
  token = req.cookies['XPUSS'];
  query = req.query;
  page = query['page'] || 1;
  status = query['status'] || 99;
  key = query['key'] || '';
  limit = 40;
  pagelet = new Pagelet(res, {
    selector: query['selector'] || '.center',
    template: 'pagelet/order/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['orders'];
      return {
        list: pageData['list'],
        key: key,
        status: status,
        page: utils.pageMaker({
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: '/order/list',
          query: {
            status: status,
            key: key
          }
        })
      };
    },
    request: {
      pathname: '/order/list',
      headers: {
        'X-Auth-Token': token
      },
      query: {
        page: page,
        limit: limit,
        status: status,
        key: key
      }
    }
  });
  return pagelet.pipe();
};

exports.visual = function(req, res) {
  var pagelet, query, token, type;
  token = req.cookies['XPUSS'];
  query = req['query'];
  type = query['type'] || "cash";
  pagelet = new Pagelet(res, {
    template: 'pagelet/order/visual/index',
    data: {
      type: type
    }
  });
  return pagelet.pipe();
};
