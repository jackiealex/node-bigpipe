var ModelAccess, Pagelet, PageletManager, Q, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

PageletManager = require('../libs/pagelet/manager');

Q = require('q');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.ui = function(req, res) {
  var limit, page, pageletLayout, pageletManager, pageletRole, pageletUrl, token;
  token = req.cookies['XPUSS'];
  page = 1;
  limit = 40;
  pageletLayout = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/permission/layout.html',
    format: function(rsAdmin) {
      var roles;
      roles = rsAdmin['data']['resp']['roles'];
      return {
        _PUBLISH_: ModelAccess.hasAuthorityWithPathAndMethod('role', 'post', roles),
        _UPDATE_: ModelAccess.hasAuthorityWithPathAndMethod('role/update', 'post', roles)
      };
    },
    request: {
      pathname: 'admin/profile',
      headers: {
        'X-Auth-Token': token
      }
    }
  });
  pageletUrl = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/permission/url.html',
    selector: '.mod-permission-manage .sub-mod-url',
    format: function(rs) {
      return {
        list: rs['data']['resp']['authorities']
      };
    },
    request: {
      pathname: '/authorities',
      headers: {
        'X-Auth-Token': token
      }
    }
  });
  pageletRole = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/permission/role.html',
    selector: '.mod-permission-manage .sub-mod-role',
    format: function(rs) {
      return {
        list: rs['data']['resp']['roles']
      };
    },
    request: {
      pathname: '/role',
      headers: {
        'X-Auth-Token': token
      }
    }
  });
  pageletManager = new PageletManager({
    pagelet: pageletLayout,
    children: [
      {
        pagelet: pageletRole,
        children: null
      }, {
        pagelet: pageletUrl,
        children: null
      }
    ]
  });
  return pageletManager.pipe();
};
