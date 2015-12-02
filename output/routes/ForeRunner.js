var ModelAccess, Pagelet, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

module.exports = function(req, res, next) {
  var isPipe, token;
  isPipe = req.query['__pipe__'];
  token = req.cookies['XPUSS'];
  if (!isPipe) {
    return api.request({
      pathname: 'admin/profile',
      headers: {
        "X-Auth-Token": token
      }
    }).done(function(rs) {
      var data, html, isSuper, menu, roles, user;
      if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
        res.clearCookie('XPUSS');
        return res.redirect("/login?code=" + rs['node_code']);
      }
      data = rs['data']['resp'];
      user = data['admin'];
      roles = data['roles'];
      res.cookie('XP_USERNAME', user['username']);
      menu = ModelAccess.getAllMenuGroups(roles, isSuper = false);
      html = template.renderFile('index.html', {
        user: user,
        menu: menu
      });
      res.write(html);
      return next();
    });
  } else {
    return next();
  }
};
