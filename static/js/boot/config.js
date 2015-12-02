require.config({
	waitSeconds: 20,
	baseUrl: "/static/js",
	deps: ['boot/entry'],
	paths: {
		'ec': '/static/plugins/echarts-2.2.5/build/dist',
		'underscore': '/static/js/base/underscore',
		'jquery': '/static/js/base/jquery-2.1.4',
		'datetime.picker': '/static/plugins/datetime.picker/jquery.datetimepicker',
		'Backbone': '/static/js/base/backbone'
	},
	shim: {
		// 'jquery.form': 'jquery',
		// 'jquery.lazyload': 'jquery',
		// 'jquery.cookie': 'jquery',
		// 'datetime.picker': 'jquery',
		// 'datetime.picker': 'jquery',
		
		
		jquery: {
			init: function() {
				console.log('jq init');
				var jq = this.jQuery.noConflict(true);
				jq.support.cors = true;
				return jq;
			},
			deps: [],
			exports: '$'
		}
	}
});