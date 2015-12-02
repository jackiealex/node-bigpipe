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
  var limit, page, pagelet, query, token;
  token = req.cookies['XPUSS'];
  query = req.query;
  page = query['page'] || 1;
  limit = 50;
  pagelet = new Pagelet(res, {
    template: 'pagelet/recharge/list',
    format: function(rs, rsAdmin) {
      var list, pageData, roles;
      roles = rsAdmin['data']['resp']['roles'];
      pageData = rs.data['resp']['page'];
      list = pageData['list'];
      return {
        list: list,
        currentPage: page,
        _PUBLISH_: ModelAccess.hasAuthorityWithPathAndMethod('recharge', 'get', roles),
        page: utils.pageMaker({
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: '/recharge/list',
          query: {}
        })
      };
    },
    requests: [
      {
        pathname: '/recharge/list',
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
