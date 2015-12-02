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
  var limit, page, pagelet, query, status, token;
  token = req.cookies['XPUSS'];
  query = req.query;
  page = query['page'] || 1;
  status = query['status'] || 1;
  limit = 50;
  pagelet = new Pagelet(res, {
    template: 'pagelet/publication/list',
    format: function(rs, rsAdmin) {
      var list, pageData, roles;
      roles = rsAdmin['data']['resp']['roles'];
      pageData = rs.data['resp']['publications'];
      list = pageData['list'];
      return {
        list: list,
        status: status,
        currentPage: page,
        _PUBLISH_: ModelAccess.hasAuthorityWithPathAndMethod('publication', 'get', roles),
        page: utils.pageMaker({
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: '/publication/list/status',
          query: {
            page: page,
            limit: limit,
            status: status
          }
        })
      };
    },
    requests: [
      {
        pathname: '/publication/list/status',
        headers: {
          'X-Auth-Token': token
        },
        query: {
          page: page,
          limit: limit,
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
