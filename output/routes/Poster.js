var ModelAccess, Pagelet, PageletManager, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

PageletManager = require('../libs/pagelet/manager');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var limit, page, pagelet, query, status, tag, token, type;
  token = req.cookies['XPUSS'];
  query = req.query;
  page = query['page'] || 1;
  tag = query['tag'] || 0;
  type = query['type'] || 1;
  status = query['status'] || 99;
  limit = 50;
  pagelet = new Pagelet(res, {
    template: 'pagelet/poster/list',
    format: function(rs, rsAdmin) {
      var list, pageData, roles;
      roles = rsAdmin['data']['resp']['roles'];
      pageData = rs.data['resp']['page'];
      list = pageData['list'];
      return {
        list: list,
        type: type,
        tag: tag,
        status: status,
        currentPage: page,
        _PUBLISH_: ModelAccess.hasAuthorityWithPathAndMethod('poster', 'get', roles),
        page: utils.pageMaker({
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: '/poster/admin',
          query: {
            page: page,
            limit: limit,
            type: type,
            status: status
          }
        })
      };
    },
    requests: [
      {
        pathname: '/poster/admin',
        headers: {
          'X-Auth-Token': token
        },
        query: {
          page: page,
          limit: limit,
          type: type,
          status: status
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

exports.modify = function(req, res) {
  var id, pagelet, query, token;
  token = req.cookies['XPUSS'];
  query = req.query;
  id = query['id'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/poster/modify',
    format: function(rs, rsAdmin) {
      var poster;
      poster = rs.data['resp']['poster'];
      return {
        poster: poster
      };
    },
    requests: [
      {
        pathname: '/poster/' + id + '/admin',
        headers: {
          'X-Auth-Token': token
        }
      }
    ]
  });
  return pagelet.pipe();
};

exports.publish = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/poster/publish'
  });
  return pagelet.pipe();
};
