var Formidable, Pagelet, Q, api, fileTransfer, fs, mkdirp, request, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

fileTransfer = require('../libs/FileTransfer');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

request = require('request');

Formidable = require('formidable');

Q = require('q');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var limit, page, pagelet, token, type;
  token = req.cookies['XPUSS'];
  type = req.query['type'] || 1;
  page = req.query['page'] || 1;
  limit = 6;
  pagelet = new Pagelet(res, {
    template: 'pagelet/notification/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs['data']['resp']['pager'];
      return {
        list: pageData['list'],
        type: type,
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/admin/notification/list',
          query: {
            type: type
          }
        })
      };
    },
    request: {
      pathname: '/admin/system/message/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit,
        type: type
      }
    }
  });
  return pagelet.pipe();
};

exports.timerlist = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 6;
  pagelet = new Pagelet(res, {
    template: 'pagelet/notification/list-timer.html',
    format: function(rs) {
      var pageData;
      pageData = rs['data']['resp']['pager'];
      return {
        list: pageData['list'],
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/admin/notification/timerlist'
        })
      };
    },
    request: {
      pathname: '/admin/system/message/timer/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: page,
        limit: limit
      }
    }
  });
  return pagelet.pipe();
};

exports.publish = function(req, res) {
  var pagelet;
  pagelet = new Pagelet(res, {
    template: 'pagelet/notification/publish',
    data: {}
  });
  return pagelet.pipe();
};

exports.create = function(req, res) {
  var token;
  token = req.cookies['XPUSS'];
  return fileTransfer(req).done(function(arr) {
    var imageID, imageKey, imageObject, imageUrl, rs, textFields;
    rs = arr[0];
    textFields = arr[1];
    imageObject = rs['data']['resp']['images'][0];
    imageKey = imageObject['cacheKey'];
    imageUrl = imageObject['url'];
    imageID = imageObject['id'];
    textFields['imageKey'] = imageKey;
    textFields['imageId'] = imageID;
    textFields['surfaceImg'] = imageUrl;
    return api.request({
      method: 'post',
      pathname: 'admin/system/message/add',
      headers: {
        'Cookie': "token=" + token
      },
      body: textFields
    }).done(function(rs) {
      return res.send(rs);
    });
  });
};

exports.updateImage = function(req, res) {
  return fileTransfer(req).done(function(rs) {
    var imageResult;
    imageResult = rs[0];
    if (imageResult['node_code'] !== _CONST_REMOTE_STATUS_CODE_['SUCCESS']) {
      return res.send(imageObject);
    }
    return res.send(imageResult);
  });
};
