var Formidable, ModelAccess, Pagelet, Q, UTCToLocalTimeString, add0, api, fileTransfer, fs, mkdirp, qs, request, template, timestr, utils, _, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_;

api = require('../libs/api');

utils = require('../libs/utils');

Pagelet = require('../libs/pagelet');

fileTransfer = require('../libs/FileTransfer');

template = require('evertpl');

fs = require('fs');

mkdirp = require('mkdirp');

_ = require('lodash');

qs = require('qs');

request = require('request');

Formidable = require('formidable');

ModelAccess = require('../model/Access');

Q = require('q');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

add0 = function(m) {
  if (m < 10) {
    return '0' + m;
  } else {
    return m;
  }
};

UTCToLocalTimeString = function(d) {
  var timeOffsetInHours;
  timeOffsetInHours = (new Date().getTimezoneOffset() / 60) + -10;
  d.setHours(d.getHours() + timeOffsetInHours);
  return d;
};

timestr = function(time) {
  return time.getFullYear() + '-' + add0(time.getMonth() + 1) + '-' + add0(time.getDate());
};

exports.list = function(req, res) {
  var end, endDate, endDay, limit, page, pagelet, query, start, startDate, startDay, time, today, token;
  token = req.cookies['XPUSS'];
  today = Date.parse(timestr(new Date));
  console.log(today);
  startDay = +today - 3600 * 1000 * 24;
  endDay = +today;
  console.log(startDay);
  query = req['query'];
  page = query['page'] || 1;
  limit = query['limit'] || 20;
  start = query['start'] || startDay;
  end = query['end'] || endDay;
  time = new Date(Number(start));
  console.log(time);
  startDate = timestr(time);
  console.log(startDate);
  time = new Date(Number(end));
  console.log(time);
  endDate = timestr(time);
  pagelet = new Pagelet(res, {
    template: 'pagelet/brushperson/list.html',
    format: function(rs, rsAdmin) {
      var list, pageData, roles;
      console.log(JSON.stringify(rs));
      roles = rsAdmin['data']['resp']['roles'];
      list = rs.data['resp']['page']['list'];
      pageData = rs.data['resp']['page'];
      return {
        list: list,
        page: utils.pageMaker({
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: '/brush/person/list',
          query: {
            start: start,
            end: end
          }
        }),
        startDate: startDate,
        endDate: endDate,
        start: start,
        end: end
      };
    },
    requests: [
      {
        pathname: '/brush/person',
        headers: {
          'X-Auth-Token': token
        },
        query: {
          page: page,
          limit: limit,
          start: start,
          end: end
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

exports.publish = function(req, res) {
  var pagelet, token;
  token = req.cookies['XPUSS'];
  pagelet = new Pagelet(res, {
    template: 'pagelet/brushperson/publish.html'
  });
  return pagelet.pipe();
};

exports.detail = function(req, res) {
  var end, endDate, endDay, limit, listpage, page, pagelet, query, start, startDate, startDay, time, today, token, userId;
  token = req.cookies['XPUSS'];
  today = new Date(timestr(new Date));
  startDay = +today - 3600 * 1000 * 24;
  endDay = +today;
  query = req['query'];
  page = query['page'] || 1;
  limit = query['limit'] || 20;
  userId = query['userId'];
  listpage = query['listpage'];
  start = query['start'] || startDay;
  end = query['end'] || endDay;
  time = new Date(Number(start));
  startDate = timestr(time);
  time = new Date(Number(end));
  endDate = timestr(time);
  pagelet = new Pagelet(res, {
    template: 'pagelet/brushperson/detail.html',
    format: function(rs) {
      var list, pageData;
      console.log(JSON.stringify(rs));
      list = rs.data['resp']['page']['list'];
      pageData = rs.data['resp']['page'];
      return {
        list: list,
        page: utils.pageMaker({
          current: pageData['pageNumber'],
          totalPage: pageData['totalPages'],
          pathname: '/brush/person/detail',
          query: {
            start: start,
            end: end,
            userId: userId,
            listpage: listpage
          }
        }),
        startDate: startDate,
        endDate: endDate,
        userId: userId,
        start: start,
        end: end,
        listpage: listpage
      };
    },
    requests: [
      {
        pathname: '/brush/order',
        headers: {
          'X-Auth-Token': token
        },
        query: {
          page: page,
          limit: limit,
          start: start,
          end: end,
          userId: userId
        }
      }
    ]
  });
  return pagelet.pipe();
};
