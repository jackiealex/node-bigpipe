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
  var limit, page, pagelet, query, token, type;
  token = req.cookies['XPUSS'];
  query = req.query;
  page = query['page'] || 1;
  type = query['type'] || 0;
  limit = 40;
  if ([0, '0'].indexOf(type) !== -1) {
    pagelet = new Pagelet(res, {
      template: 'pagelet/version/list.html',
      format: function(rs, rsAdmin) {
        var list;
        console.log(JSON.stringify(rs));
        list = rs.data['resp']['versions'];
        return {
          list: list,
          type: type
        };
      },
      requests: [
        {
          pathname: 'client/check/version',
          headers: {
            'X-Auth-Token': token
          },
          query: {
            page: page,
            limit: limit,
            isAdmin: true
          }
        }, {
          pathname: 'admin/profile',
          headers: {
            'X-Auth-Token': token
          }
        }
      ]
    });
  } else {
    pagelet = new Pagelet(res, {
      template: 'pagelet/version/list-2.html',
      format: function(rs, rsAdmin) {
        var list;
        console.log(JSON.stringify(rs));
        list = rs.data['resp'] && rs.data['resp']['iOSUpdate'] || {};
        list = [].concat(list);
        return {
          list: list,
          type: type
        };
      },
      requests: [
        {
          pathname: '/ios/update/version',
          headers: {
            'X-Auth-Token': token
          }
        }, {
          pathname: 'admin/profile',
          headers: {
            'X-Auth-Token': token
          }
        }
      ]
    });
  }
  return pagelet.pipe();
};

exports.publish = function(req, res) {
  var pagelet, query, token, type;
  token = req.cookies['XPUSS'];
  query = req.query;
  type = query['type'] || 0;
  pagelet = new Pagelet(res, {
    template: 'pagelet/version/publish.html',
    data: {
      type: type
    }
  });
  return pagelet.pipe();
};
