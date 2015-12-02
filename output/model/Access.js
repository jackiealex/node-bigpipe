var accessMap, getAllAuthoritiesFromRoleArray, getMenuItemsWithAuthorities, isAllDepsInAuthorities, isDepInAuthorities, regTrimSlash, _;

_ = require('lodash');

regTrimSlash = /^\/|\/$/g;

accessMap = {
  music: {
    title: '买唱',
    site: 'http://vsingapp.com',
    routes: {
      "/system/config": {
        text: '配置管理',
        clsName: 'nav-system-config',
        deps: 'config/detail, get'
      },
      "/admin/list": {
        text: '管理员中心',
        clsName: 'nav-admin-list',
        deps: 'admin,get'
      },
      "/auth/list": {
        text: '权限管理',
        clsName: 'nav-auth-list',
        mode: 'read',
        deps: ['authorities, get', 'role, get']
      },
      "/label/list": {
        text: '标签管理',
        clsName: 'nav-label-list',
        mode: 'read',
        deps: 'label/page, get'
      },
      "/order/list": {
        text: '订单管理',
        clsName: 'nav-order-list',
        mode: 'read',
        deps: 'order/list, get'
      },
      "/order/visual": {
        text: '订单可视化',
        clsName: 'nav-order-visual',
        mode: 'read',
        deps: 'order/list, get'
      },
      "/music/list": {
        text: '曲库管理',
        clsName: 'nav-music-list',
        mode: 'read',
        deps: 'accompany/list/admin, get'
      },
      "/feedback/list": {
        text: '曲库反馈管理',
        clsName: 'nav-feedback-list',
        mode: 'read',
        deps: 'feedback/list, get'
      },
      "/user/list": {
        text: '用户管理',
        clsName: 'nav-user-list',
        mode: 'read',
        deps: 'search/users, get'
      },
      "/publication/list": {
        text: '发布内容管理',
        clsName: 'nav-publication-list',
        mode: 'read',
        deps: 'publication/list/status, get'
      },
      "/report/list": {
        text: '举报中心',
        clsName: 'nav-report-list',
        mode: 'read',
        deps: 'report, get'
      },
      "applaunch/list": {
        text: '启动页管理',
        mode: 'read',
        clsName: 'nav-applaunch-list',
        secureLevel: 'super',
        deps: ''
      },
      "/version/list": {
        text: '版本控制',
        mode: 'read',
        clsName: 'nav-version-list',
        secureLevel: 'super',
        deps: 'ios/update/version, post'
      },
      "/broadcast": {
        text: '广播中心',
        mode: 'read',
        clsName: 'nav-broadcast',
        secureLevel: 'super',
        deps: ''
      },
      "/message/by/group": {
        text: '消息群发',
        mode: 'read',
        clsName: 'nav-message-by-group'
      },
      "/notification/list": {
        text: '系统消息通知管理',
        mode: 'read',
        clsName: 'nav-notification-list',
        secureLevel: 'super',
        deps: ['authorities, get', 'role, get']
      },
      "/brush/person/list": {
        text: 'BRUSH列表',
        mode: 'read',
        clsName: 'nav-brushperson-list',
        deps: 'brush/person, get'
      },
      "/withdraws/list": {
        text: '提现管理',
        mode: 'read',
        clsName: 'nav-withdraws-list',
        deps: 'withdraws, get'
      },
      "/recharge/list": {
        text: '充值列表',
        mode: 'read',
        clsName: 'nav-recharge-list',
        deps: 'recharge/list, get'
      },
      "/poster/list": {
        text: 'Banner管理',
        mode: 'read',
        clsName: 'nav-poster-list',
        deps: 'poster/admin, get'
      },
      "/coupon/list": {
        text: '红包配置管理',
        mode: 'read',
        clsName: 'nav-coupon-list',
        deps: 'coupon, get'
      },
      "/admin/publish": {
        text: '管理员中心',
        clsName: 'nav-admin-publish',
        mode: 'create',
        deps: 'admin,post'
      },
      "/admin/alloc": {
        text: '分配角色',
        mode: 'update',
        deps: 'admin/{id}/roles,post'
      }
    }
  }
};

exports.hasAuthorityWithPathAndMethod = function(path, method, roles) {
  var authorities;
  if (method == null) {
    method = 'post';
  }
  authorities = getAllAuthoritiesFromRoleArray(roles);
  return isDepInAuthorities([path, method].join(','), authorities);
};

exports.hasAuthorityByUrl = function(url, groupName, roles, isSuper) {
  var authorities, deps, group, opts;
  if (groupName == null) {
    groupName = 'music';
  }
  group = accessMap[groupName];
  if (!group) {
    return false;
  }
  url = '/' + url.replace(regTrimSlash, '');
  opts = group.routes[url];
  if (!opts) {
    return false;
  }
  if (isSuper) {
    return true;
  }
  deps = [].concat(opts['deps'] || []);
  authorities = getAllAuthoritiesFromRoleArray(roles);
  return isAllDepsInAuthorities(deps, authorities);
};

getAllAuthoritiesFromRoleArray = function(roleArray) {
  return _.flatten(_.pluck(roleArray, 'authorities'));
};

isDepInAuthorities = function(dep, authorities) {
  var auth, authorityMethod, authorityUrl, depComponents, _i, _len;
  for (_i = 0, _len = authorities.length; _i < _len; _i++) {
    auth = authorities[_i];
    dep = dep.replace(regTrimSlash, '');
    depComponents = dep.split(/,/);
    depComponents[0] = depComponents[0].replace(regTrimSlash, '').trim().toLowerCase();
    depComponents[1] = (depComponents[1] || 'get').trim().toLowerCase();
    authorityUrl = auth['url'].replace(regTrimSlash, '');
    authorityMethod = auth['method'].toLowerCase();
    if (authorityUrl === depComponents[0] && authorityMethod === depComponents[1]) {
      return true;
    }
  }
  return false;
};

isAllDepsInAuthorities = function(deps, authorities) {
  var dep, _i, _len;
  for (_i = 0, _len = deps.length; _i < _len; _i++) {
    dep = deps[_i];
    if (isDepInAuthorities(dep, authorities) === false) {
      return false;
    }
  }
  return true;
};

getMenuItemsWithAuthorities = function(authorities, routeNode, isSuper) {
  var deps, href, list, opts, results;
  if (routeNode == null) {
    routeNode = 'music';
  }
  list = accessMap[routeNode]['routes'];
  results = [];
  for (href in list) {
    opts = list[href];
    opts['mode'] || (opts['mode'] = 'read');
    if (opts['mode'] !== 'read') {
      continue;
    }
    deps = [].concat(opts['deps'] || []);
    if (deps.length <= 0 || isSuper || isAllDepsInAuthorities(deps, authorities)) {
      results.push({
        text: opts['text'],
        clsName: opts['clsName'],
        href: href
      });
    }
  }
  return results;
};

exports.getAllMenuGroups = function(roles, isSuper) {
  var authorities, group, groupName, resultMap;
  resultMap = {};
  authorities = getAllAuthoritiesFromRoleArray(roles);
  for (groupName in accessMap) {
    group = accessMap[groupName];
    resultMap[groupName] = {
      title: group['title'],
      site: group['site'],
      list: getMenuItemsWithAuthorities(authorities, groupName, isSuper)
    };
  }
  return resultMap;
};

exports.accessMap = accessMap;
