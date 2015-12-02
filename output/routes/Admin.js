var Formidable, ModelAccess, Pagelet, Q, api, fileTransfer, fs, mkdirp, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

fileTransfer = require('../libs/FileTransfer');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

request = require('request');

Formidable = require('formidable');

Q = require('q');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var key, limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  key = req.query['key'];
  page = req.query['page'] || 1;
  limit = 40;
  if (!key) {
    pagelet = new Pagelet(res, {
      template: 'pagelet/admin/list',
      format: function(rs, rsAdmin) {
        var pageData, roles;
        roles = rsAdmin['data']['resp']['roles'];
        pageData = rs.data['resp']['page'];
        return {
          key: key || '',
          list: pageData['list'],
          _PUBLISH_: ModelAccess.hasAuthorityByUrl('/admin/publish', 'music', roles),
          _ALLOC_ROLE_: ModelAccess.hasAuthorityWithPathAndMethod('admin/{id}/roles', 'post', roles),
          page: utils.pageMaker({
            current: pageData['pageNumber'],
            totalPage: pageData['totalPages'],
            pathname: 'admin/list',
            query: {
              key: key
            }
          })
        };
      },
      requests: [
        {
          pathname: 'admin',
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
  } else {
    pagelet = new Pagelet(res, {
      template: 'pagelet/admin/list',
      format: function(rs) {
        var list, pageData;
        pageData = list = rs.data['resp']['page'];
        list = rs.data['resp']['page']['list'];
        return {
          key: key || '',
          list: list,
          page: utils.pageMaker({
            current: pageData['pageNumber'],
            totalPage: pageData['totalPages'],
            pathname: 'admin/list',
            query: {
              key: key
            }
          })
        };
      },
      request: {
        pathname: 'admin/search',
        headers: {
          'X-Auth-Token': token
        },
        query: {
          page: page,
          limit: limit,
          username: key,
          nickname: key
        }
      }
    });
    return pagelet.pipe();
  }
};

exports.publish = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    autoPipe: true,
    template: 'pagelet/admin/publish',
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
  return pagelet.pipe();
};

exports.allocRole = function(req, res) {
  var limit, page, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  return api.request({
    pathname: '/role',
    headers: {
      'X-Auth-Token': token
    }
  }).done(function(rs) {
    var html, list;
    list = rs['data']['resp']['roles'];
    html = template.renderFile('pagelet/admin/role', {
      list: list
    });
    res.write(html);
    return res.end();
  });
};

exports.onesRole = function(req, res) {
  var adminId, token;
  token = req.cookies['XPUSS'];
  adminId = req.query['id'];
  return api.request({
    pathname: "admin/" + adminId,
    headers: {
      'X-Auth-Token': token
    }
  }).done(function(rs) {
    var html, list;
    list = rs['data']['resp']['roles'];
    html = template.renderFile('pagelet/admin/preview-role', {
      list: list
    });
    res.write(html);
    return res.end();
  });
};

exports.create = function(req, res) {
  var token;
  token = req.cookies['XPUSS'];
  return fileTransfer(req).done(function(arr) {
    var imageID, imageKey, imageUrl, rs, textFields;
    rs = arr[0];
    textFields = arr[1];
    imageKey = rs['data']['resp']['images'][0]['cacheKey'];
    imageUrl = rs['data']['resp']['images'][0]['url'];
    imageID = rs['data']['resp']['images'][0]['id'];
    textFields['imageKey'] = imageKey;
    textFields['surfaceImg'] = imageUrl;
    textFields['headUrl'] = imageID;
    return api.request({
      method: 'post',
      pathname: '/admin/admin/add',
      headers: {
        'X-Auth-Token': "" + token
      },
      body: textFields
    }).done(function(rs) {
      return res.send(rs);
    });
  });
};

exports.updateHeadImage = function(req, res) {
  var token;
  token = req.cookies['XPUSS'];
  return fileTransfer(req).done(function(arr) {
    var imageKey, imageUrl, rs, textFields;
    rs = arr[0];
    if (rs['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
      return res.send(imageObject);
    }
    textFields = arr[1];
    imageKey = rs['data']['resp']['images'][0]['cacheKey'];
    imageUrl = rs['data']['resp']['images'][0]['url'];
    textFields['imageUrl'] = imageUrl;
    textFields['imageKey'] = imageKey;
    textFields['headUrl'] = imageKey;
    return api.request({
      method: 'post',
      pathname: 'admin/self/update/head',
      headers: {
        'X-Auth-Token': token
      },
      body: textFields
    }).done(function(rs) {
      return res.send(rs);
    });
  });
};
