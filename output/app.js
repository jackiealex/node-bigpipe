var APP, Admin, AppBaseController, AppLaunch, Atlas, Broadcast, BrushPerson, Coupon, DataAnalysis, Feedback, ForeRunner, Index, Label, MessageByGroup, Music, Notification, Order, Pagelet, PassportCheck, Permission, Poster, Publication, Recharge, Recommend, Report, Statistics, Stickers, SystemConfiguration, Test, UploadMedia, User, VerifyCode, Version, Withdraws, api, app, argv, bodyParser, config, cookieParser, express, fs, get_static_md5_content, mkdirp, session, template, utils, _, _Bridge, _CONST_NODE_ERROR_CODE_, _CONST_REMOTE_STATUS_CODE_, _FN_ENSURE_CONTEXT_,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('./global');

config = require('./config');

_FN_ENSURE_CONTEXT_ = function(options) {
  var _CONST_MODE_;
  if (options == null) {
    options = {};
  }
  GLOBAL_OBJECT['mode'] = _CONST_MODE_ = options['mode'] || process.env['NODE_ENV'];
  GLOBAL_OBJECT['_CONST_LOCAL_SERVER_PORT_'] = options['local_server_port'] || (_CONST_MODE_ === 'development' ? config['dev_port'] : config['pro_port']);
  GLOBAL_OBJECT['_CONST_REMOTE_SERVER_DOMAIN_'] = options['remote_server_name'] || (_CONST_MODE_ === 'development' ? config['dev_remote_server_name'] : config['pro_remote_server_name']);
  GLOBAL_OBJECT['_CONST_REMOTE_SERVER_NAME_'] = options['remote_server_name'] || (_CONST_MODE_ === 'development' ? config['dev_remote_server_name'] : config['pro_remote_server_ip'] || config['pro_remote_server_name']);
  return GLOBAL_OBJECT['_CONST_STATIC_CDN_'] = options['cdn'] || (_CONST_MODE_ === 'development' ? config['dev_static_CDN'] : config['pro_static_CDN']);
};

argv = require('optimist').argv;

_FN_ENSURE_CONTEXT_({
  mode: argv['mode'],
  local_server_port: argv['port'],
  remote_server_name: argv['api'],
  cdn: argv['cdn']
});

AppBaseController = require('./libs/AppBaseController');

Pagelet = require('./libs/pagelet');

api = require('./libs/api');

utils = require('./libs/utils');

Test = require('./routes/Test');

_Bridge = require('./routes/_Bridge');

Index = require('./routes/Index');

Label = require('./routes/Label');

Music = require('./routes/Music');

Feedback = require('./routes/Feedback');

Order = require('./routes/Order');

SystemConfiguration = require('./routes/SystemConfiguration');

MessageByGroup = require('./routes/MessageByGroup');

Atlas = require('./routes/Atlas');

Version = require('./routes/Version');

User = require('./routes/User');

UploadMedia = require('./routes/UploadMedia');

Admin = require('./routes/Admin');

Permission = require('./routes/Permission');

Broadcast = require('./routes/Broadcast');

Report = require('./routes/Report');

ForeRunner = require('./routes/ForeRunner');

PassportCheck = require('./routes/PassportCheck');

VerifyCode = require('./routes/VerifyCode');

AppLaunch = require('./routes/AppLaunch');

Recommend = require('./routes/Recommend');

Stickers = require('./routes/Stickers');

Notification = require('./routes/Notification');

Statistics = require('./routes/Statistics');

DataAnalysis = require('./routes/DataAnalysis');

BrushPerson = require('./routes/BrushPerson');

Withdraws = require('./routes/Withdraws');

Recharge = require('./routes/Recharge');

Publication = require('./routes/Publication');

Poster = require('./routes/Poster');

Coupon = require('./routes/Coupon');

template = require('evertpl');

fs = require('fs');

bodyParser = require('body-parser');

cookieParser = require('cookie-parser');

session = require('cookie-session');

mkdirp = require('mkdirp');

express = require('express');

_ = require('lodash');

_CONST_REMOTE_STATUS_CODE_ = GLOBAL_OBJECT['_CONST_REMOTE_STATUS_CODE_'];

_CONST_NODE_ERROR_CODE_ = GLOBAL_OBJECT['_CONST_NODE_ERROR_CODE_'];

mkdirp.sync('__temp_upload__');

get_static_md5_content = function() {
  var e, md5_map_content;
  md5_map_content = '{}';
  try {
    md5_map_content = fs.readFileSync('./static/js/md5_map.json');
  } catch (_error) {
    e = _error;
    console.log('not production mode', e);
  }
  return md5_map_content;
};

APP = (function(_super) {
  __extends(APP, _super);

  function APP(options) {
    template.config({
      src: './views',
      env: GLOBAL_OBJECT['mode'],
      local: {
        mode: GLOBAL_OBJECT['mode'],
        api_domain: GLOBAL_OBJECT['_CONST_REMOTE_SERVER_DOMAIN_'],
        static_cdn: GLOBAL_OBJECT['_CONST_STATIC_CDN_'],
        md5_map_content: get_static_md5_content()
      }
    });
    template.helper('whenHappend', utils.whenHappend);
    template.helper('timeFormat', utils.timeFormat);
    template.helper('dateFormat', utils.dateFormat);
    APP.__super__.constructor.call(this, options);
  }

  return APP;

})(AppBaseController);

app = new APP({
  port: GLOBAL_OBJECT['_CONST_LOCAL_SERVER_PORT_'],
  mode: GLOBAL_OBJECT['mode'],
  assets: [
    {
      pattern: '/static',
      root: './static'
    }, {
      pattern: '/resource',
      root: './__temp_upload__'
    }, {
      pattern: '/favicon.ico',
      root: './static/img/icons/logo.png'
    }
  ]
});

app.server.disable('x-powered-by');

app.server.set('x-powered-by', 'Phoenix');

app.server.use(bodyParser.urlencoded({
  extended: false
}));

app.server.use(bodyParser.json());

app.server.use(cookieParser());

app.server.use(session({
  name: 'NYUSS',
  keys: ['xipu'],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  secret: 'you never get the secret'
}));

app.server.all('/*', function(req, res, next) {
  var startTime;
  startTime = new Date;
  console.log(startTime, req.path, ' arrive', 'METHOD', req.method);
  res.on('finish', function(e) {
    var endTime;
    endTime = new Date;
    return console.log(endTime, req.path, ' depart ', (endTime - startTime) + 'ms RTT');
  });
  return next();
});

app.server.get('/login', function(req, res, next) {
  var html, query;
  query = req.query;
  html = template.renderFile('page/login/index.html', query);
  return res.send(html);
});

app.server.get('/logout', function(req, res) {
  var code, html;
  code = req.query['code'] || 'logout';
  html = template.renderFile('page/login/index.html', {});
  res.clearCookie('XPUSS');
  return res.redirect("/login?code=" + code);
});

app.server.get('/user/message/list', User.messagelist);

app.server.get('/atlas/:id/detail', Atlas.detail);

app.server.get('/test/', Test.resource);

app.server.get('/status/code', function(req, res) {
  var html;
  html = template.renderFile('page/sorry/status.code', {});
  res.write(html);
  return res.end();
});

app.addPipeRoutes(['/', '/home', '/index'], Index);

app.addPipeRoutes('/atlas/list', Atlas.list);

app.addPipeRoutes('/atlas/list/top', Atlas.top);

app.addPipeRoutes('/atlas/publish', Atlas.publish);

app.addPipeRoutes('/atlas/list/timing', Atlas.timing);

app.addPipeRoutes('/broadcast', Broadcast.ui);

app.addPipeRoutes('/auth/list', Permission.ui);

app.addPipeRoutes('/user/list', User.list);

app.addPipeRoutes('/user/toplist', User.toplist);

app.addPipeRoutes('/report/list', Report.list);

app.addPipeRoutes('/report/list/:id/detail', Report.listDetail);

app.addPipeRoutes('/music/list', Music.list);

app.addPipeRoutes('/music/publish', Music.publish);

app.addPipeRoutes('/music/modify', Music.modify);

app.addPipeRoutes('/feedback/list', Feedback.list);

app.addPipeRoutes('/user/recmd/list', Recommend.list);

app.addPipeRoutes('/admin/list', Admin.list);

app.addPipeRoutes('/admin/publish', Admin.publish);

app.addPipeRoutes('/admin/alloc/role', Admin.allocRole);

app.addPipeRoutes('/message/by/group', MessageByGroup.list);

app.addPipeRoutes('/admin/ones/role', Admin.onesRole);

app.addPipeRoutes('/label/list', Label.list);

app.addPipeRoutes('/label/publish', Label.publish);

app.addPipeRoutes('/order/list', Order.list);

app.addPipeRoutes('/order/visual', Order.visual);

app.addPipeRoutes('/stickers/publish', Stickers.publish);

app.addPipeRoutes('/stickers/list', Stickers.list);

app.addPipeRoutes('/stickers/type/list', Stickers.typeList);

app.addPipeRoutes('/stickers/detail/list', Stickers.detailList);

app.addPipeRoutes('/applaunch/publish', AppLaunch.publish);

app.addPipeRoutes('/applaunch/list', AppLaunch.list);

app.addPipeRoutes('/notification/publish', Notification.publish);

app.addPipeRoutes('/notification/list', Notification.list);

app.addPipeRoutes('/admin/data/analysis', DataAnalysis.list);

app.addPipeRoutes('/version/publish', Version.publish);

app.addPipeRoutes('/version/list', Version.list);

app.addPipeRoutes('/brush/person/list', BrushPerson.list);

app.addPipeRoutes('/brush/person/publish', BrushPerson.publish);

app.addPipeRoutes('/brush/person/detail', BrushPerson.detail);

app.addPipeRoutes('/withdraws/list', Withdraws.list);

app.addPipeRoutes('/Recharge/list', Recharge.list);

app.addPipeRoutes('/system/config', SystemConfiguration.index);

app.addPipeRoutes('/Publication/list', Publication.list);

app.addPipeRoutes('/Poster/list', Poster.list);

app.addPipeRoutes('/Poster/publish', Poster.publish);

app.addPipeRoutes('/Poster/modify', Poster.modify);

app.addPipeRoutes('/Coupon/list', Coupon.list);

app.addPipeRoutes('/Coupon/publish', Coupon.publish);

app.addPipeRoutes('/Publication/list', Publication.list);

app.addPipeRoutes('/test/layout', Test.layout);

app.addPipeRoutes('/test/view', Test.view);

app.addPipeRoutes('/test/load', Test.load);

app.addPipeRoutes('/test/delay1', Test.delay1);

app.addPipeRoutes('/test/delay2', Test.delay2);

app.addPipeRoutes('/test/tmpl', Test.tmpl);

app.addPipeRoutes('/verifycode', VerifyCode.list);

app.addPipeRoutes('/admin/dnu', Statistics.dnu);

app.server.post('/notification/create', Notification.create);

app.server.post('/notification/updateimg', Notification.updateImage);

app.server.post('/sticker/type/add', Stickers.createType);

app.server.post('/stickers/create', Stickers.create);

app.server.post('/stickers/type/update', Stickers.updateType);

app.server.post('/stickers/update', Stickers.update);

app.server.post('/passport/check', PassportCheck);

app.server.post('/upload/media', UploadMedia);

app.server.post('/admin/create', Admin.create);

app.server.post('/admin/update/portrait', Admin.updateHeadImage);

app.server.post('/applaunch/create', AppLaunch.create);

app.server.post('/applaunch/updateimg', AppLaunch.updateImage);

app.addSocketIOHandler(require('./routes/socket/push'));

_Bridge(app.server);

if (GLOBAL_OBJECT['mode'] !== 'development') {
  app.server.use(function(req, res, next) {
    var html, pagelet;
    if (req.query['__pipe__']) {
      pagelet = new Pagelet({
        template: 'page/sorry/404.html'
      });
      return pagelet.pipe(res);
    }
    html = template.renderFile('page/sorry/404.html', {});
    return res.send(html);
  });
  app.server.use(function(err, req, res, next) {
    var html;
    console.log(err);
    html = template.renderFile('page/sorry/5xx.html', {});
    return res.send(html);
  });
}

app.start(function() {
  console.log(this.options);
  console.log('global: ', GLOBAL_OBJECT);
  return console.log('\n浏览器访问：http://localhost:' + this.options.port);
});
