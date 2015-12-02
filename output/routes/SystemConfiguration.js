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

exports.index = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/system-configuration/index',
    format: function(rs, rsAdmin) {
      var list, roles;
      roles = rsAdmin['data']['resp']['roles'];
      list = rs.data['resp']['configurations'];
      return {
        list: list,
        _PUBLISH_: ModelAccess.hasAuthorityWithPathAndMethod('config', 'get', roles)
      };
    },
    requests: [
      {
        pathname: '/config/detail',
        headers: {
          'X-Auth-Token': token
        },
        query: {}
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
