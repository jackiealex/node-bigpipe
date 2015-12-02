var ModelAccess, Pagelet, URL, api, fs, mkdirp, template, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

URL = require('url');

ModelAccess = require('../model/Access');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

exports.list = function(req, res) {
  var condition, createDate, gender, limit, nickname, page, pageQuery, pagelet, pathname, query, status, token, type;
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
    createDate: createDate
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
  pagelet = new Pagelet(res, {
    template: 'pagelet/user/list.html',
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
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: 'user/list',
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
  return pagelet.pipe();
};

exports.toplist = function(req, res) {
  var createDate, gender, limit, nickname, page, pagelet, query, status, token, type;
  token = req.cookies['XPUSS'];
  query = req['query'];
  page = query['page'] || 1;
  limit = query['limit'] || 20;
  nickname = query['nickname'] || '';
  gender = query['gender'] || void 0;
  status = 'status' in query ? query['status'] : void 0;
  createDate = query['createDate'] || '';
  type = query['type'] || '0';
  pagelet = new Pagelet(res, {
    template: 'pagelet/user/list',
    format: function(rs, rsAdmin) {
      var list, roles;
      roles = rsAdmin['data']['resp']['roles'];
      list = rs.data['resp']['list'];
      return {
        list: list,
        nickname: nickname,
        gender: gender,
        status: status,
        type: type,
        createDate: createDate,
        currentPage: page,
        page: utils.pageMaker({
          current: 1,
          totalPage: 1,
          pathname: 'user/top/list',
          query: []
        })
      };
    },
    requests: [
      {
        pathname: '/user/top/list',
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

exports.messagelist = function(req, res) {
  var endTime, query, ra, sa, startTime, token;
  token = req.cookies['XPUSS'];
  query = req['query'];
  sa = query['sa'];
  console.log(sa);
  ra = query['ra'];
  console.log(ra);
  startTime = query['startTime'];
  endTime = query['endTime'];
  console.log(startTime);
  console.log(endTime);
  return api.request({
    pathname: "/message/user/list",
    headers: {
      'X-Auth-Token': token
    },
    query: {
      sendAccount: sa,
      recAccount: ra,
      startTime: startTime,
      endTime: endTime
    }
  }).done(function(rs) {
    var html;
    console.log(rs);
    rs = rs.data['resp']['msgs'];
    html = template.renderFile('pagelet/user/message-list.html', {
      rs: rs,
      sa: sa,
      ra: ra
    });
    res.write(html);
    return res.end();
  });
};
