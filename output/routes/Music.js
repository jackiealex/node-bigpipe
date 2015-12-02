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
  var key, limit, page, pagelet, query, select, token, type;
  token = req.cookies['XPUSS'];
  query = req.query;
  page = query['page'] || 1;
  type = query['type'] || 0;
  select = query['select'] || '';
  key = query['key'] || '*';
  limit = 50;
  pagelet = new Pagelet(res, {
    template: 'pagelet/music/list',
    format: function(rs, rsAdmin) {
      var list, pageData, roles;
      roles = rsAdmin['data']['resp']['roles'];
      pageData = rs.data['resp']['accompanies'];
      list = pageData['list'];
      return {
        list: list,
        select: select,
        type: type,
        currentPage: page,
        _PUBLISH_: ModelAccess.hasAuthorityWithPathAndMethod('accompany', 'post', roles),
        page: utils.pageMaker({
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: '/music/list',
          query: {
            select: select,
            type: type,
            key: key
          }
        })
      };
    },
    requests: [
      {
        pathname: '/accompany/list/admin',
        headers: {
          'X-Auth-Token': token
        },
        query: {
          page: page,
          limit: limit,
          type: type,
          key: key
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
    template: 'pagelet/music/modify',
    format: function(rs, rsAdmin) {
      var accompany;
      accompany = rs.data['resp']['accompany'];
      return {
        accompany: accompany
      };
    },
    requests: [
      {
        pathname: '/accompany/' + id,
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
    template: 'pagelet/music/publish'
  });
  return pagelet.pipe();
};
