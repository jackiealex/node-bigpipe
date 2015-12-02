var ModelAccess, Pagelet, PageletManager, URL, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

PageletManager = require('../libs/pagelet/manager');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

URL = require('url');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var condition, createDate, gender, limit, nickname, page, pageQuery, pageletA, pageletB, pageletLayout, pageletManager, pathname, query, status, token, type;
  pageletLayout = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/message-by-group/layout.html'
  });
  token = req.cookies['XPUSS'];
  query = req['query'];
  page = query['page'] || 1;
  limit = query['limit'] || 20;
  nickname = query['nickname'] || '';
  gender = query['gender'] || void 0;
  status = 'status' in query ? query['status'] : void 0;
  createDate = query['createDate'] || '';
  type = query['type'] || '0';
  condition = [];
  if (status) {
    condition.push(['status', status].join(':'));
  }
  if (gender) {
    condition.push(['gender', gender].join(':'));
  }
  if (type === '1') {
    condition.push(['isQuality', 1].join(':'));
  }
  if (condition.length > 0) {
    condition = condition.join(',');
  } else {
    condition = void 0;
  }
  query = {
    page: page,
    limit: limit,
    condition: condition,
    nickname: nickname,
    createDate: createDate
  };
  pathname = '/search/users';
  pageQuery = {
    nickname: nickname,
    status: status,
    gender: gender,
    type: type,
    createDate: createDate,
    auto_end_a: Date.now()
  };
  pageQuery = utils.excludeObject(pageQuery);
  if (type === '2') {
    query = {
      page: page,
      limit: limit
    };
    pathname = 'disabled/user';
    pageQuery = {
      type: type
    };
  }
  pageletA = new Pagelet(res, {
    template: 'pagelet/message-by-group/list.html',
    selector: '.sub-main .user-box',
    format: function(rs) {
      var list, pageData;
      list = rs.data['resp']['page']['list'];
      pageData = rs.data['resp']['page'];
      return {
        list: list,
        nickname: nickname,
        gender: gender,
        status: status,
        type: type,
        createDate: createDate,
        currentPage: page,
        page: utils.pageMaker({
          wing: 2,
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: 'message/by/group',
          query: pageQuery
        })
      };
    },
    request: {
      pathname: pathname,
      headers: {
        'X-Auth-Token': token
      },
      query: query
    }
  });
  if (req.query['__pipe__'] && req.query['auto_end_a']) {
    return pageletA.pipe().done(function() {
      return pageletA.end();
    });
  }
  pageletB = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/message-by-group/header.html',
    selector: '.sub-header'
  });
  pageletManager = new PageletManager({
    pagelet: pageletLayout,
    children: [
      {
        pagelet: pageletB
      }, {
        pagelet: pageletA
      }
    ]
  });
  return pageletManager.pipe();
};
