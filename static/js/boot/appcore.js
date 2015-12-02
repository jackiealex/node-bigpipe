define(function() {
	function trimSlash(str) {
		return str.replace(/^\/+|\/+$/g, '');
	};

	function APPCore(opts) {
		this.options = _.extend({
			triggerSelector: '.action-paresh',
			onChange: function(state, isLocation) {
				window['_SmartPipe_'].doPipeRequest(state);
			},
			onHistoryChange: function(e) {
				window['_SmartPipe_'].reload()
			}
		}, opts);
		this._init();
	};

	_.extend(APPCore.prototype, {
		_init: function() {
			this._changePageEvent();
			this._onLocationChange(location.pathname, true);

		},
		_onLocationChange: function (pathname, isLocation){
			var state = {
				title: document.title,
				url: pathname,
				referer: pathname
			};
			if(isLocation) {
				// var query = utils.queryString(pathname)
			}
			this.options['onChange'].call(null, state, isLocation);
		},
		_changePageEvent: function(callback) {
			var _that = this;
			$('body').on('click', this.options['triggerSelector'], function(e) {
				e.preventDefault();
				var url = $(this).attr('href') || $(this).data('url');
				var title = $(e.target).data('title') || document.title;
				url = '/' + trimSlash(url);
				var referer = location.href;
				var state = {
					title: title,
					url: url,
					referer: referer
				};
				window.history.pushState(state, title, url);
				_that.options['onChange'].call(null, state);
			});
			window.onpopstate = function() {
				_that.options['onHistoryChange'].apply(null, arguments);
			}
		}
	});
	return APPCore
});