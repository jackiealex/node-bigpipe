config = {
	watcher: {
		browser: {
			target: ["static/**/*.*"]
		},
		boot: {
			target: ["libs/**/*", "model/**/*", "routes/**/*", "extend/**/*.js", "handler/**/*", "*.coffee", "config.json"]
		}
	},

	dev_port: 8889
	pro_port: 9999
}

module.exports = config
