var Formidable, ModelAccess, Pagelet, Q, api, fileTransfer, fs, mkdirp, qs, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

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

ModelAccess = require('../model/Access');

Q = require('q');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/label/list.html',
    format: function(rs, rsAdmin) {
      var pageData, roles;
      roles = rsAdmin['data']['resp']['roles'];
      pageData = rs.data['resp']['page'];
      return {
        list: pageData['list'],
        _PUBLISH_: ModelAccess.hasAuthorityWithPathAndMethod('label', 'post', roles),
        page: utils.pageMaker({
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: '/label/list',
          query: {}
        })
      };
    },
    requests: [
      {
        pathname: '/label/page',
        headers: {
          'X-Auth-Token': token
        },
        query: {
          page: page,
          limit: limit
        }
      }, {
        pathname: 'admin/profile',
        headers: {
          'X-Auth-Token': token
        }
      }
    ]
  });
  return pagelet.pipe();
};

exports.publish = function(req, res) {
  var pagelet, query, token;
  token = req.cookies['XPUSS'];
  query = req.query;
  pagelet = new Pagelet(res, {
    template: 'pagelet/label/publish.html'
  });
  return pagelet.pipe();
};
