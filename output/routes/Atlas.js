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
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/atlas/list',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        type: 'all',
        data: pageData,
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/atlas/list'
        })
      };
    },
    request: {
      pathname: '/admin/atlas/list/all',
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

exports.top = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/atlas/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        data: pageData,
        type: 'top',
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/t/list'
        })
      };
    },
    request: {
      pathname: '/admin/atlas/top/list',
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

exports.detail = function(req, res) {
  var headUrl, id, pageletComment, pageletLayout, pageletManager, pageletUser, size, token, uid;
  token = req.cookies['XPUSS'];
  id = req.params['id'];
  headUrl = req.query['headUrl'];
  uid = req.query['uid'];
  size = 29;
  pageletLayout = new Pagelet(res, {
    autoEnd: false,
    selector: '#window .win-content',
    template: 'page/preview/index',
    format: function(rs) {
      var basic, data, images, labels, links;
      data = rs['data']['resp'];
      images = data['images'];
      labels = data['labels'];
      basic = data['atlas'];
      links = data['links'];
      return {
        headUrl: headUrl,
        uid: uid,
        id: id,
        labels: labels,
        images: images,
        basic: basic,
        links: links
      };
    },
    request: {
      pathname: '/admin/atlas/get',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        id: id
      }
    }
  });
  pageletComment = new Pagelet(res, {
    autoEnd: false,
    template: 'page/preview/comment.html',
    selector: '.mod-atlas-preview .speak-here .list',
    format: function(rs) {
      return {
        comments: rs['data']['resp']['comments']
      };
    },
    request: {
      pathname: '/atlas/comment/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        atlasId: id,
        page: 1,
        limit: 20
      }
    }
  });
  pageletUser = new Pagelet(res, {
    autoEnd: false,
    template: 'page/preview/user.html',
    selector: '.mod-atlas-preview .followers',
    format: function(rs) {
      return {
        users: rs['data']['resp']['users']
      };
    },
    request: {
      pathname: '/admin/random/user/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        size: size
      }
    }
  });
  pageletManager = new PageletManager({
    pagelet: pageletLayout,
    children: [
      {
        pagelet: pageletComment
      }, {
        pagelet: pageletUser
      }
    ]
  });
  return pageletManager.pipe();
};

exports.publish = function(req, res) {
  var level, pageletCategory, pageletMain, pageletManager, roles, token, _isAddLabelAvailable, _isTuPopoutAvailable;
  roles = req.session.roles;
  level = req.session.level;
  token = req.cookies['XPUSS'];
  _isAddLabelAvailable = ModelAccess.isUrlAvailable('/label/add', 'tplus', roles, level);
  _isTuPopoutAvailable = ModelAccess.isUrlAvailable('/atlas/publish/top', 'tplus', roles, level);
  pageletCategory = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/atlas/category-list',
    selector: '.mod-publish .category',
    format: function(rs) {
      return {
        list: rs['data']['resp']['data'],
        pid: ''
      };
    },
    request: {
      pathname: 'admin/interestcate/alllist',
      headers: {
        'Cookie': "token=" + token
      }
    }
  });
  pageletMain = new Pagelet(res, {
    autoEnd: false,
    template: 'pagelet/atlas/publish',
    format: function(rs) {
      return {
        data: rs.data['resp']['pager'],
        _isTuPopoutAvailable: _isTuPopoutAvailable,
        _isAddLabelAvailable: _isAddLabelAvailable
      };
    },
    request: {
      pathname: '/admin/label/list',
      headers: {
        'Cookie': "token=" + token
      },
      query: {
        page: 1,
        limit: 20,
        type: 4
      }
    }
  });
  pageletManager = new PageletManager({
    pagelet: pageletMain,
    children: [
      {
        pagelet: pageletCategory,
        children: null
      }
    ]
  });
  return pageletManager.pipe();
};

exports.timing = function(req, res) {
  var limit, page, pagelet, token;
  token = req.cookies['XPUSS'];
  page = req.query['page'] || 1;
  limit = 40;
  pagelet = new Pagelet(res, {
    template: 'pagelet/atlas/list.html',
    format: function(rs) {
      var pageData;
      pageData = rs.data['resp']['pager'];
      return {
        data: pageData,
        type: "timing",
        page: utils.pageMaker({
          current: pageData['currentPage'],
          totalPage: pageData['pageCount'],
          pathname: '/atlas/list/timing'
        })
      };
    },
    request: {
      pathname: '/admin/atlas/timer/all',
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
