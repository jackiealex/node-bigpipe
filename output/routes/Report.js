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
  var key, limit, page, pagelet, query, status, token;
  token = req.cookies['XPUSS'];
  query = req['query'];
  page = query['page'] || 1;
  limit = query['limit'] || 50;
  key = query['key'];
  status = query['status'];
  if (status) {
    pagelet = new Pagelet(res, {
      template: 'pagelet/report/list.html',
      format: function(rs, rsAdmin) {
        var list, pageData, roles;
        console.log(JSON.stringify(rs));
        roles = rsAdmin['data']['resp']['roles'];
        list = rs.data['resp']['page']['list'];
        pageData = rs.data['resp']['page'];
        return {
          key: key || '',
          list: list,
          page: utils.pageMaker({
            current: pageData['pageNumber'],
            totalPage: pageData['totalPages'],
            pathname: 'user/list',
            query: {
              key: key
            }
          }),
          status: status
        };
      },
      requests: [
        {
          pathname: '/report',
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
  } else {
    pagelet = new Pagelet(res, {
      template: 'pagelet/report/list.html',
      format: function(rs, rsAdmin) {
        var list, pageData, roles;
        console.log(JSON.stringify(rs));
        roles = rsAdmin['data']['resp']['roles'];
        list = rs.data['resp']['page']['list'];
        pageData = rs.data['resp']['page'];
        return {
          key: key || '',
          list: list,
          page: utils.pageMaker({
            current: pageData['pageNumber'],
            totalPage: pageData['totalPages'],
            pathname: 'user/list',
            query: {
              key: key
            }
          })
        };
      },
      requests: [
        {
          pathname: '/report',
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
  }
  return pagelet.pipe();
};

exports.listDetail = function(req, res) {
  var id, query, token;
  token = req.cookies['XPUSS'];
  query = req['query'];
  id = req.params['id'];
  console.log(id);
  return api.request({
    pathname: "/report/" + id,
    headers: {
      'X-Auth-Token': token
    }
  }).done(function(rs) {
    var data, html;
    console.log(rs);
    data = rs.data['resp'];
    html = template.renderFile('pagelet/report/list-detail', data);
    res.write(html);
    return res.end();
  });
};
