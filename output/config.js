var config;

config = {
  watcher: {
    browser: {
      target: ["static/**/*.*"]
    },
    boot: {
      target: ["libs/**/*", "model/**/*", "routes/**/*", "extend/**/*.js", "handler/**/*", "*.coffee", "config.json"]
    }
  },
  dev_remote_server_name: "localhost:8080",
  dev_remote_server_name: "bleach.testapi.591ku.com",
  pro_remote_server_name: "bleach.api.vsingapp.com",
  dev_port: 8889,
  pro_port: 9999,
  test_static_CDN: 'http://test.nuoya.vsingapp.com',
  pro_static_CDN: 'http://7xlphm.com1.z0.glb.clouddn.com'
};

module.exports = config;
